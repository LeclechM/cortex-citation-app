<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const { auth } = useSupabaseClient()
const pendingRequest = ref(false)
const signInSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
}))

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: signInSchema,
})

const token = ref<string>()

const onSubmit = handleSubmit(async (values) => {
  pendingRequest.value = true
  const { error } = await auth.signInWithPassword({
    email: values.email,
    password: values.password,
    options: {
      captchaToken: token.value,
    },
  })
  pendingRequest.value = false
  if (error) {
    toast.error(error.message)
  }
  else {
    toast.success('Connexion successful!')
    navigateTo('/')
  }
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <UiCard class="w-full max-w-md">
      <UiCardHeader>
        <UiCardTitle class="text-2xl">
          Se connecter
        </UiCardTitle>
        <UiCardDescription>
          Entrez votre email et mot de passe pour vous connecter à votre compte.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form class="grid gap-4" @submit.prevent="onSubmit">
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
          <UiFormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Password</UiFormLabel>
              <UiFormControl>
                <UiInput type="password" v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <NuxtTurnstile v-model="token" />
          <UiButton type="submit" class="w-full mb-2" :disabled="pendingRequest">
            <Icon v-if="pendingRequest" name="radix-icons:update" class="mr-2 animate-spin" />
            Connexion
          </UiButton>
          <div class="text-center">
            Pas de compte ?
            <NuxtLink to="/signup">
              <UiButton variant="link">
                Créer un compte
              </Uibutton>
            </NuxtLink>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
