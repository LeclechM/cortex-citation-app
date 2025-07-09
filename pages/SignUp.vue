<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import z from 'zod'

const token = ref<string>()
const pendingRequest = ref(false)

const signUpSchema = toTypedSchema(z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirm'], // path of error
}))

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: signUpSchema,
})
const { auth } = useSupabaseClient()
const onSubmit = handleSubmit(async (values) => {
  pendingRequest.value = true
  const { error } = await auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      captchaToken: token.value,
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
      },
    },
  })
  pendingRequest.value = false
  if (error) {
    toast.error(error.message)
  }
  else {
    toast.success('Inscription réussie!')
    navigateTo('/signin')
  }
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <UiCard class="w-full max-w-md">
      <UiCardHeader>
        <UiCardTitle class="text-2xl">
          Création de compte
        </UiCardTitle>
        <UiCardDescription>
          Entrez votre email et un mot de passe pour vous créer un compte.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form class="grid gap-4" @submit.prevent="onSubmit">
          <UiFormField v-slot="{ componentField }" name="lastName" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Nom</UiFormLabel>
              <UiFormControl>
                <Input v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="firstName" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Prénom</UiFormLabel>
              <UiFormControl>
                <Input v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <Input type="email" v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Password</UiFormLabel>
              <UiFormControl>
                <Input type="password" v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Confirm Password</UiFormLabel>
              <UiFormControl>
                <Input type="password" v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <NuxtTurnstile v-model="token" />
          <Button type="submit" class="w-full mb-2" :disabled="pendingRequest">
            <Icon v-if="pendingRequest" name="radix-icons:update" class="mr-2 animate-spin" />
            Créer un compte
          </Button>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
