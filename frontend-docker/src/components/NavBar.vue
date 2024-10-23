<template>
    <v-app-bar app>
        <v-toolbar-title>
            Jokefy
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text to="/">HOME</v-btn>
            <v-btn text to="/suggestion">SUGGEST</v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
.navbar {
    background-color: #3f51b5;
    color: white;
}
</style>