<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      color="#e6e6eb"
      :clipped="clipped"
      hide-overlay
      absolute
      temporary
      app
    > 
      <v-list>
        <v-container>
        <v-img 
          width="150px"
          class="ml-8"
          src="https://bolsasuniedu.sed.sc.gov.br/Resources/Transparente.png"></v-img>
        </v-container>
        <v-list-item
          class="mt-1"
          v-for="(item, i) in pages"
          :key="i"
          color="#004000"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="#004000">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title color="#004000" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      color="#004000"
      app
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"/>
        <v-toolbar-title>
          <v-img
            class="mx-2 rounded-lg"
            src="https://www.unochapeco.edu.br/static/data/portal/sites/banners/811.png"
            max-height="150"
            max-width="150"
            contain
          ></v-img>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        open-on-hover
        offset-y
      >
        <v-card>
          <v-card-text>
        </v-card-text>
        </v-card>
      </v-menu>
      <v-menu
        open-on-hover
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#004000"
            height="100%"
            outlined
            elevation="0"
            to="/"
          >
          <p 
            style="color:white;" 
            class="mt-5 ml-5"
          >
            Sair
          </p>
          </v-btn>
        </template>
      <v-list>
          <v-list-item
            v-for="(item, index2) in actionsItems"
            :key="index2"
            link
            :to="item.link"
          >
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      apps
    >
      <span>&copy; Abex 3 - Uniedu {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',
  data () {
    return {
      badge:true,
      clipped: false,
      drawer: false,
      fixed: false,
      name: 'Pedro',
      notification: [
        {title: 'Nova entrega de atividade!!!!', data: 'Aviso de testes'},
        {title: 'Atividade Sábado', data: 'Aviso de testes'}
      ],
      pages: [
        { icon: 'mdi-account', title: 'Tipos de Usuarios', to: '/admin/pais' },
        { icon: 'mdi-earth', title: 'Importar Dados', to: '/admin/idioma' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'UNOCHAPECO'
    }
  }
}
</script>