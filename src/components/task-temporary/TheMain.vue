<template>

<v-container>

  <v-row class="mt-2">
    <v-col cols="12" sm="5">
      <v-text-field
        v-model="firstName" 
        label="Название Графика"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="lastName" 
        label="Название Графика"
        outlined
      ></v-text-field>

    </v-col>
  </v-row>
</v-container>

</template>

<script>

  export default {
    name: 'Aside',

    data: () => ({
      firstName: 'Дима',
      lastName: 'Клюшкин',
      acceptInputs: ['']
    })
  }
</script>
