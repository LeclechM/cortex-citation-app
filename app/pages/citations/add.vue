<script lang="ts" setup>
import { DateFormatter, parseDate } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { toDate } from 'reka-ui/date'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import z from 'zod'
import { cn } from '@/lib/utils'
import type { Database } from '~/types/database.types'

const currentLocale = 'fr-FR'

const df = new DateFormatter(currentLocale, {
  dateStyle: 'long',
})

const citationSchema = toTypedSchema(z.object({
  fromWhom: z.string().nonempty(),
  content: z.string().nonempty(),
  fromWhen: z.string().refine(v => v).optional(),
}))

const { handleSubmit, isFieldDirty, setFieldValue, values } = useForm({
  validationSchema: citationSchema,
})

const value = computed({
  get: () => values.fromWhen ? parseDate(values.fromWhen) : undefined,
  set: val => val,
})

const onSubmit = handleSubmit(async (values) => {
  const client = useSupabaseClient<Database>()
  const { error } = await client.from('citations').insert({
    content: values.content,
    from_whom: values.fromWhom,
    from_when: values.fromWhen ? values.fromWhen : undefined,
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
    <UiCard class="w-full max-w-md">
      <UiCardTitle>
        <UiCardHeader>
          Ajouter une citation
        </UiCardHeader>
      </UiCardTitle>

      <UiCardContent>
        <form class="grid gap-4">
          <UiFormField v-slot="{ componentField }" name="fromWhom" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Auteur</UiFormLabel>
              <UiFormControl>
                <UiInput v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiFormField name="fromWhen" :validate-on-blur="!isFieldDirty">
            <UiFormItem class="flex flex-col">
              <UiFormLabel>Date</UiFormLabel>
              <UiPopover>
                <UiPopoverTrigger as-child>
                  <UiFormControl>
                    <UiButton
                      variant="outline" :class="cn(
                        'ps-3 text-start font-normal',
                        !value && 'text-muted-foreground',
                      )"
                    >
                      <span>{{ value ? df.format(toDate(value)) : "Choisir une date" }}</span>
                      <Icon name="radix-icons:calendar" class="ms-auto h-4 w-4 opacity-50" />
                    </UiButton>
                    <input hidden>
                  </UiFormControl>
                </UiPopoverTrigger>
                <UiPopoverContent class="w-auto p-0">
                  <UiCalendar
                    :model-value="value"
                    :locale="currentLocale"
                    initial-focus
                    @update:model-value="(v) => {
                      if (v) {
                        setFieldValue('fromWhen', v.toString())
                      }
                      else {
                        setFieldValue('fromWhen', v)
                      }
                    }"
                  />
                </UiPopoverContent>
              </UiPopover>
              <UiFormDescription>
                Sélectionnez une date pour la citation. Si vous ne connaissez pas la date, laissez vide.
              </UiFormDescription>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiFormField v-slot="{ componentField }" name="content" :validate-on-blur="!isFieldDirty">
            <UiFormItem>
              <UiFormLabel>Citation</UiFormLabel>
              <UiFormControl>
                <UiTextarea v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </form>
      </UiCardContent>
      <UiCardFooter>
        <UiButton class="w-full" @click.prevent="onSubmit">
          Ajouter la citation
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
