<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined>
          <v-card-title>
            <v-row>
              <v-col>
                <b>
                  <p id="setup">{{ joke.setup }}</p>
                </b>
                <p id="punchline">{{ joke.punchline }}</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="fetchJoke" :loading="loading" :disabled="loading" color="primary">
              {{ buttonText }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="likeJoke" :loading="loading" :disabled="loading" color="primary">
              <span :class="`mdi ${liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'} text-h5`"></span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getJoke } from '@/api/agent';

export default {
  name: 'HomePage',
  data() {
    return {
      joke: {
        setup: '',
        punchline: ''
      },
      loading: false,
      buttonText: 'Pegar Piada',
      liked: false // Propriedade reativa para controlar o estado do ícone
    };
  },
  methods: {
    async fetchJoke() {
      this.liked = false; // Reseta o estado do ícone
      this.loading = true;
      this.buttonText = 'Carregando...';
      try {
        const response = await getJoke();
        this.joke = response;
      } catch (error) {
        console.error('Failed to fetch joke:', error);
        this.joke = {
          setup: 'Error',
          punchline: 'Não foi possível buscar a piada'
        };
      } finally {
        this.loading = false;
        this.buttonText = 'Pegar Piada';
      }
    },
    likeJoke() {
      this.liked = !this.liked; // Alterna o estado do ícone
      console.log('Liked joke:', this.joke);
    }
  },
  mounted() {
    this.fetchJoke();
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>