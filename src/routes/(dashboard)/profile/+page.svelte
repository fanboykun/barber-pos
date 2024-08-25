<script lang="ts">
	import DeleteAccount from '$lib/components/pages/profile/DeleteAccount.svelte';
	import UpdatePasswordForm from '$lib/components/pages/profile/UpdatePasswordForm.svelte';
	import UpdateProfileForm from '$lib/components/pages/profile/UpdateProfileForm.svelte';
	import { toast } from 'svelte-sonner';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	$: {
      if(form?.success != undefined) {
          let isSuccess = form?.success == true
          let toastMessage = isSuccess ? 'The Action Executed Successfully' : 'The Action Failed to Execute'
          if(form.message && typeof form.message === 'string') toastMessage = form.message
          toast(isSuccess ? 'Success' : 'Failed', {
              description: toastMessage,
          })
      }
  }
</script>


<div class="bg-gray-50 w-full h-full">

	<UpdateProfileForm authUser={data.authUser} {form} />
	<UpdatePasswordForm {form} />
	<DeleteAccount {form}  />

</div>
