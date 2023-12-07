<template>
 <v-container>
  <v-row>
    <h1
    class="mt-12 ml-5 fontBold"
    >
      Demandas relacionadas ao meu curso
    </h1>
  </v-row>
    <v-row  >
      <v-col class="mt-12 ml-n5" cols="3" v-for="(item, index) in data">
        <v-card 
          height="450px"
          on-hover:elevation="12"
          :key="index"
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="item.imagemLink"
          >
        </v-img>
        <v-card-title>{{ item.demandaNome }}</v-card-title>

          <v-card-subtitle 
          height="100px"
          class="pb-0">
            {{ item.demandaDescricao }}
          </v-card-subtitle>

          <v-card-text class="mt-7 text--primary">
              <div>Horas: {{ item.quantidadeHoras }}</div>
              <div>Vagas: {{ item.quantidadeVagas }}</div>
            
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="green"
              text
            >
              Ver mais
            </v-btn>

            <v-btn
              color="green"
              text
            >
              Me inscrever
            </v-btn>
          </v-card-actions>
        </v-card> 
      </v-col>
    </v-row>
    <v-row>

    </v-row>
 </v-container>
</template>

<script>
import { title } from 'process';

export default {
  name: 'IndexPage',
  layout: 'default',
data() {
  return {
    data: [],
  };

//ex de json dentro de data:
//são vários objetos dentro de data
// {
//   "id": 6,
//   "demandaNome": "Projeto Voluntariado Social",
//   "demandaDescricao": "O projeto visa auxiliar comunidades carentes através de atividades de voluntariado.",
//   "quantidadeHoras": 8,
//   "quantidadeVagas": 10,
//   "dataInicio": "2021-10-01",
//   "dataFim": "2022-09-30",
//   "finalizada": false,
//   "dataCadastro": "2021-09-01",
//   "horaCadastro": "13:00:00",
//   "dataFimInscricao": "2021-09-30",
//   "usuarioId": 6,
//   "imagemLink": "https://images.pexels.com/photos/1550339/pexels-photo-1550339.jpeg",
//   "localizacaoId": 6
// }

},
computed: {
  title: function() {
    return "Uniedu"
  }
},

async created(){
    await this.getItems();
},
  
methods:{

  async getItems(){
    try{
      let res = await fetch('http://localhost:3333/demanda')
      let response = await res.json()
      this.data = response.data
      this.dialog = false

    } catch (error) {
      return console.log(error)
    }
  },

}
};
</script>

<style
  scoped
>
.font {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.fontBold {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
}
</style>
