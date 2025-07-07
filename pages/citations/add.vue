<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const citationSchema = toTypedSchema(z.object({
  fromWhom: z.string().nonempty(),
  content: z.string().nonempty(),
}))

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: citationSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const client = useSupabaseClient()
  const { error } = await client.from('citations').insert({
    content: values.content,
    from_whom: values.fromWhom,
    user_id: useSupabaseUser()?.value?.id,
  })

  if (error) {
    return toast.error(`Erreur lors de l'ajout de la citation: ${error.message}`)
  }
  toast.success('Citation ajoutée avec succès!')
  navigateTo('/citations')
})
</script>

<template>
  <div class="w-full h-full p-4 flex items-center justify-center">
    <Card class="w-full max-w-md">
      <CardTitle>
        <CardHeader>
          Ajouter une citation
        </CardHeader>
      </CardTitle>

      <CardContent>
        <form class="grid gap-4">
          <FormField v-slot="{ componentField }" name="fromWhom" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Auteur</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="content" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Citation</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click.prevent="onSubmit">
          Ajouter la citation
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
