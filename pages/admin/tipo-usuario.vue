<template>
  <v-container>
    <v-row class="font mt-5">
      <v-col>
        <template>
          <h1>Tipo do Usuário</h1>
          <v-card
            class="secondary rounded-lg pa-4 mt-2"
            elevation="10"
          >
            <v-card-title class="fontBold display-0">
              <v-text-field
                v-model="search"
                color="primary"
                append-icon="mdi-magnify"
                placeholder="Pesquisar"
                background-color="secondary"
                persistent-placeholder
                hide-details
                single-line
                outlined
                rounded
                dense
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                class="mx-2"
                elevation="1"
                color="primary"
                fab
                small
                @click="newItem"
              >
                <v-icon
                  color="white"
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-data-table
              style="background-color:#f7f7f7"
              :headers="headers"
              :items="data"
              :page.sync="page"
              :search="search"
              :items-per-page="itemsPerPage"
              color="secondary"
              :footer-props="{
                'items-per-page-text': 'Itens por página', 
              }"
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="edit(item)"
                  color="primary"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="destroy(item)"
                  color="red"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            <v-divider></v-divider>
            <v-card-actions>
              <div 
                class="pt-6"
              >
                <v-autocomplete
                  v-model="itemsPerPage"
                  label="Itens"
                  color= "primary"
                  class="pr-4 ml-6"
                  style="width:100px;"
                  :items="autocomplete"
                  background-color="white"
                  item-value="name"
                  item-text="name"
                  outlined
                  dense
                  rounded
                ></v-autocomplete>
              </div>
            <v-spacer></v-spacer>
              <v-pagination
                v-model="page"
                :length="pageCount"
                style="ma"
                circle
                color="primary"
                :total-visible="5"
              >
              </v-pagination>
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="850px"
    >
      <v-card 
        color="white" 
        class="pa-4 rounded-lg"
      >
      <v-card-title>
          <span class="font">{{title}}</span>
        </v-card-title>
        <v-row style="margin:auto">
          <v-col cols="12">
            <v-form v-model="valid" ref="form">
              <v-container> 
                <v-row >
                 <v-col cols="3">
                  <v-text-field
                    v-model="info.idTipoMobilidade"
                    outlined
                    label="ID"
                    background-color="secondary"
                    class="custom-placeholer-color text-green"
                    placeholder="ID Tipo de atividade"
                    disabled
                  ></v-text-field>
                 </v-col>
                 <v-col cols="9">
                  <v-text-field
                    outlined
                    v-model="info.descTipoMobilidade"
                    label="Novo tipo de atividade"
                    background-color="secondary"
                    class="custom-placeholer-color text-green"
                    placeholder="Tipo de atividade"
                    :rules="rule"
                  ></v-text-field>
                </v-col> 
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-container >
            <v-row>
              <v-spacer></v-spacer>
              <v-col
                cols="10"
                align="right"
              >
                <v-btn
                  outlined
                  color="red"
                  @click="resetForm"
                >
                  Cancelar
                </v-btn>
              </v-col>
              <v-col
                align="right"
              >
                <v-btn
                  outlined
                  color="primary"
                  @click="persist"
                >
                  Salvar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { title } from 'process';

export default {
  name: "tipoMobilidade",
  layout: 'admin',
  data() {
    return {
      search: '',
      editMode: false,
      info:{
        idTipoMobilidade: null,
        descTipoMobilidade: null
      },
      dialog: false,
      valid: false,
      description: '',
      
      headers: [
        { text: "ID", value: "idTipoMobilidade", align: 'center' },
        { text: "Tipo da Mobilidade", value: "descTipoMobilidade", align: 'center' },
        {text: "", value: "actions"}
      ],
      data: [],
      autocomplete: [5,  10,  15,  20, 25, 30],
      page:1,
      pageCount: 10,
      itemsPerPage:5,
      rule:[
        a => !!a || 'Cadastro inválido'
      ]
    };
  },
  computed: {
    title: function() {
      return this.editMode ? 'Editar Tipo de usuario':'Novo Tipo de usuario'
    }
  },

 async created(){
    await this.getItems();
  },
  
  methods:{
    async getItems(){
      try {
        let res = await this.$api.get(`/tipo-usuario`);
        this.data = res.data
        if (res.type == 'error') {
          return this.$toast.error('Ocorreu um erro ao carregar os dados!')
        }
      } catch (error) {
          return this.$toast.error("Ocorreu um erro!")
      }
    },
    newItem(){
     try {
       this.editMode = false;
       this.info.idTipoMobilidade = null
       this.info.descTipoMobilidade = null
       this.dialog = true
     } catch (error) {
      return this.$toast.error("Ocorreu um erro!")
     }
    },
    async resetForm(){
      try {
        this.dialog = false;
        this.$refs.form.reset();
        this.description = '',
        await this.getItems();
      } catch (error) {
          return this.$toast.error("Ocorreu um erro!")
      }
    },
    async edit(item){
     try {
       this.editMode = true;
       this.info.idTipoMobilidade = item.idTipoMobilidade;
       this.info.descTipoMobilidade = item.descTipoMobilidade;
       this.dialog = true;
     } catch (error) {
        return this.$toast.error("Ocorreu um erro!")
     }
    },
    async persist(){
      try {
        if (!this.valid) return this.$toast.warning("Preencha todos os campos obrigatórios");
        let req =  {
          descTipoMobilidade: this.info.descTipoMobilidade
        } 
          let id = this.info.idTipoMobilidade ? `${this.info.idTipoMobilidade}` : ''
          let res = await this.$api.post(`/tipo-mobilidade/persist/${id}`, req)
          this.resetForm()
          this.getResponseMessage(res)
        }
        catch (error) {
          return this.$toast.error("Ocorreu um erro!")
      }
    },
    async destroy(item){
      try {
        this.$confirm({
          title:'Excluir',
          message:`Tem certeza que deseja excluir o resistro id ${item.idTipoMobilidade}?`,
          button: {
            no: 'Não',
            yes: 'Sim'
          },
          callback: async confirm => {
            if(confirm){
              let res = await this.$api.post('/tipo-mobilidade/destroy',{idTipoMobilidade: item.idTipoMobilidade})
              this.getResponseMessage(res)
              this.getItems()    
            }
          }
        })
      } catch (error) {
        this.$toast.error("Ocorreu um erro!")
      }
    },
    getResponseMessage (response) {
      if (response.type == 'success'){
        return this.$toast.success(`${response.message}`)
      } else if (response.type == 'warning') {
        return this.$toast.warning(`${response.message}`)
      } else if (response.type == 'error') {
        return this.$toast.error(`${response.message}`)
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