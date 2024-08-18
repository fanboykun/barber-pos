<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index"
	import type { SubmitFunction } from "@sveltejs/kit";
    import { Html5Qrcode } from "html5-qrcode";

    export let isScanCustomerDialogOpen = false
    export let onClose: Function

    let scannedCustomerId:string = ''
    let scanCustomerform: HTMLFormElement
    let html5QrCodeObj: Html5Qrcode
    let facingMode: 'user'|'environment' = 'user'

    function beginOpenCamera() {
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            setTimeout(() => {
                beginOpenScan(cameraId)
            }, 300)
        }
        }).catch(err => {
            console.log(err)
        });
    }

    async function beginOpenScan(cameraId: string) {
        html5QrCodeObj = new Html5Qrcode(/* element id */ "reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } }; 
        html5QrCodeObj.start(
            cameraId, config,
            (decodedText, decodedResult) => {
                beginGetCustomer(decodedText)
            },
            (errorMessage) => {
                // parse error, ignore it.
                // console.log(errorMessage)
            })
            .catch((err) => {
                console.log(err)
                closeScannerDialog()
            // Start failed, handle it.
        });
    }

    async function openCameraWithFlip() {
        await setTimeout(() => {}, 300)
        if(html5QrCodeObj == undefined) { html5QrCodeObj = new Html5Qrcode(/* element id */ "reader"); }
        const config = { fps: 10, qrbox: { width: 250, height: 250 } }; 
        html5QrCodeObj.start(
            { facingMode: facingMode }, config,
            (decodedText, decodedResult) => {
                beginGetCustomer(decodedText)
            },
            (errorMessage) => {
                // parse error, ignore it.
                // console.log(errorMessage)
            })
            .catch((err) => {
                console.log(err)
                closeScannerDialog()
            // Start failed, handle it.
        });
    }

    async function flipCamera() {
        if(html5QrCodeObj) {
            await html5QrCodeObj.stop()
            facingMode = facingMode == 'user' ? 'environment' : 'user'
            return openCameraWithFlip()
        }
    }
    
    async function closeScannerDialog() {
        if(html5QrCodeObj != undefined){
            await html5QrCodeObj.stop()
        }
        onClose()
    }

    function beginGetCustomer(customerId: string) {
        scannedCustomerId = customerId
        scanCustomerform.requestSubmit()
    }
    
    const getCustomerFromDb: SubmitFunction = ( { formData } ) =>  {
        formData.append('customerId', scannedCustomerId)
        console.log('included customerId' ,formData.get('customerId'))
        return async ({ result }) => {
            if(result.type != "success") return
            // console.log('result after from submit', result)
            await html5QrCodeObj.stop()
            return onClose(result.data)
        }
    }


    // $: if(isScanCustomerDialogOpen) { beginOpenCamera() }
    $: if(isScanCustomerDialogOpen) { openCameraWithFlip() }
</script>

<Dialog.Root open={isScanCustomerDialogOpen} onOpenChange={() => closeScannerDialog()}>
    <Dialog.Content class="sm:max-w-[500px]">
      <Dialog.Header>
        <Dialog.Title>Search Customer</Dialog.Title>
        <Dialog.Description>
          scan customer qr code
        </Dialog.Description>
      </Dialog.Header>
      <div class="flex justify-center items-center w-full">
          <div id="reader" class="w-full h-full {facingMode == 'user' ? 'scale-x-[-1]' : 'scale-x-[1]' } "></div>
        <form action="?/getCustomer" method="post" class="hidden" bind:this={scanCustomerform} use:enhance={getCustomerFromDb}>
            <button class="hidden" type="submit">submit</button>
        </form>
      </div>
      <Dialog.Footer>
        <div class="w-full flex justify-between">
            <Button type="button" variant="secondary" class="flex gap-x-2" on:click={flipCamera}> 
                <span>Flip Camera</span>    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>                  
            </Button>
            <Button type="button" variant="secondary" on:click={closeScannerDialog}> Close </Button>
        </div>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>