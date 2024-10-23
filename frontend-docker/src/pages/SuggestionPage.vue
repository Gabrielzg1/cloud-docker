<template>
  <v-row align="center" justify="center" class="form">
    <v-col cols="12" md="8">
      <form @submit.prevent="handleSubmit">
        <v-text-field v-model="state.setup" :counter="100" :error-messages="v$.setup.$errors.map(e => e.$message)"
          label="Setup" @blur="v$.setup.$touch" @input="v$.setup.$touch" class="input-field"></v-text-field>

        <v-text-field v-model="state.punchline" :counter="100"
          :error-messages="v$.punchline.$errors.map(e => e.$message)" label="Punchline" @blur="v$.punchline.$touch"
          @input="v$.punchline.$touch" class="input-field"></v-text-field>

        <v-btn type="submit" class="me-4">
          Submit
        </v-btn>
      </form>
    </v-col>
  </v-row>

  <!-- Snackbar for notifications -->
  <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout" :color="snackbar.color">
    {{ snackbar.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="snackbar.visible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { suggestJoke } from '@/api/agent'

export default {
  name: 'SuggestionPage',
  setup() {
    const state = reactive({
      setup: '',
      punchline: '',
    })

    const rules = {
      setup: { required },
      punchline: { required },
    }

    const v$ = useVuelidate(rules, state)

    const snackbar = reactive({
      visible: false,
      message: '',
      color: '',
      timeout: 3000,
    })

    const showSnackbar = (message, color) => {
      snackbar.message = message
      snackbar.color = color
      snackbar.visible = true
    }

    const handleSubmit = async () => {
      try {
        await suggestJoke(state)
        showSnackbar('Suggestion submitted successfully', 'success')
      } catch (error) {
        showSnackbar(`Failed to submit suggestion`, "error")
      }
    }
    return { state, v$, handleSubmit, snackbar }
  },
}
</script>

<style scoped>
.form {
  margin-top: 50px;
}

.input-field {
  width: 100%;
}
</style>