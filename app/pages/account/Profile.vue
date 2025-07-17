<script lang="ts" setup>
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import z from 'zod'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const profileSchema = toTypedSchema(z.object({
  firstName: z.string().min(1, 'Le prénom est requis').default(() => user.value?.user_metadata?.first_name || ''),
  lastName: z.string().min(1, 'Le nom est requis').default(() => user.value?.user_metadata?.last_name || ''),
  email: z.string().email().default(() => user.value?.email || ''),
}))

const { handleSubmit, isFieldDirty, isSubmitting } = useForm({
  validationSchema: profileSchema,
})

const onSubmit = handleSubmit(async (form) => {
  if (!user.value)
    return

  const { error } = await auth.updateUser({
    email: form.email,
    data: {
      first_name: form.firstName,
      last_name: form.lastName,
    },
  })
  if (error) {
    return toast.error(error.message)
  }

  toast.success('Profil mis à jour !')
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <UiCard class="w-full max-w-md">
      <UiCardHeader>
        <UiCardTitle>Mon profil</UiCardTitle>
        <UiCardDescription>Modifiez vos informations personnelles</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form class="grid gap-4" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- lastname field -->
            <UiFormField v-slot="{ componentField }" name="lastName" :validate-on-blur="!isFieldDirty">
              <UiFormItem>
                <UiFormLabel>Nom</UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" />
                </UiFormControl>
                <UiFormDescription />
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <!-- firstname field -->
            <UiFormField v-slot="{ componentField }" name="firstName" :validate-on-blur="!isFieldDirty">
              <UiFormItem>
                <UiFormLabel>Prénom</UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" />
                </UiFormControl>
                <UiFormDescription />
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </div>

          <!-- Email field -->
          <UiFormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <UiInput type="email" v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiButton :disabled="isSubmitting" type="submit">
            Enregistrer
          </Uibutton>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
