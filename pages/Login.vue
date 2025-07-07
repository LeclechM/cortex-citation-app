<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

definePageMeta({
  layout: 'login', // Disable the default layout for this page
})

const { auth } = useSupabaseClient()

const loginSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
}))

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: loginSchema,
})

const token = ref<string>()
const onSubmit = handleSubmit(async (values) => {
  const { error } = await auth.signInWithPassword({
    email: values.email,
    password: values.password,
    options: {
      captchaToken: token.value,
    },
  })
  if (error) {
    toast.error(error.message)
  }
  else {
    toast.success('Login successful!')
    navigateTo('/')
  }
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <NuxtTurnstile v-model="token" />
          <Button type="submit" class="w-full">
            Login
          </Button>
        </Form>
      </CardContent>
    </Card>
  </div>
</template>
