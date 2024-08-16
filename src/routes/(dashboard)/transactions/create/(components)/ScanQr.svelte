<script lang="ts">
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index"
	import type { SubmitFunction } from "@sveltejs/kit";
    import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
	import type { EventHandler } from "svelte/elements";

    export let isScanCustomerDialogOpen = false
    export let onClose: Function

    let scannedCustomerId:string = ''
    let scanCustomerform: HTMLFormElement

    // let Html5Qrcode: Html5QrcodeScanner
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
        const html5QrCodeObj = new Html5Qrcode(/* element id */ "reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } }; 
        html5QrCodeObj.start(
            cameraId, config,
            (decodedText, decodedResult) => {
                beginGetCustomer(decodedText)
                html5QrCodeObj.stop()
            },
            (errorMessage) => {
                // parse error, ignore it.
                // console.log(errorMessage)
            })
            .catch((err) => {
                console.log(err)
            // Start failed, handle it.
        });
    }

    function closeScannerDialog() {
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
            console.log('result after from submit', result)
            return onClose(result.data)
        }
    }


    $: if(isScanCustomerDialogOpen) { beginOpenCamera() }
</script>

<Dialog.Root open={isScanCustomerDialogOpen} onOpenChange={() => onClose()}>
    <Dialog.Content class="sm:max-w-[500px]">
      <Dialog.Header>
        <Dialog.Title>Search Customer</Dialog.Title>
        <Dialog.Description>
          Search customer by name or phone then select it to create transaction
        </Dialog.Description>
      </Dialog.Header>
      <div class="flex justify-center items-center w-full">
          <!-- <canvas></canvas> -->
          <!-- <div id="reader" class="w-[300px] h-[300px] scale-x-[-1]"></div> -->
          <div id="reader" class="w-full h-full scale-x-[-1]"></div>
        <form action="?/getCustomer" method="post" class="hidden" bind:this={scanCustomerform} use:enhance={getCustomerFromDb}>
            <button class="hidden" type="submit">submit</button>
        </form>
      </div>
      <Dialog.Footer>
        <Button type="button" variant="secondary" on:click={closeScannerDialog}> Close </Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>