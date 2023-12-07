<template>
  <v-app dark>
    <vue-confirm-dialog></vue-confirm-dialog>
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
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#004000"
            height="100%"
            v-bind="attrs"
            elevation="0"
            v-on="on"
            outlined
            fab
          >
          <v-badge
            v-if="badge"
            dot
            color="red"
            overlap
          >
            <v-icon
              color="white"
            >
              mdi-bell
            </v-icon>
          </v-badge>
          <v-icon 
              v-if="!badge"
              color="white"
            >
              mdi-bell
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
        <v-list>
          <v-list-item
            v-for="(item3, index3) in notification"
            :key="index3"
            link
            :to="item3.link"
          >
            <v-list-item-title>{{item3.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
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
            v-bind="attrs"
            v-on="on"
            outlined
            elevation="0"
          >
          <v-avatar
            size="40"
          >
            <v-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkQz6MBM4H75kQyj-knYjmZ3aCuD3k0AO9g&usqp=CAU"
            >
            </v-img>
          </v-avatar>
          <p 
            style="color:white;" 
            class="mt-5 ml-5"
          >
            {{name}}
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
      actionsItems: [
        {title: 'Meus dados',link: "google.com"},
        {title: 'Sair', link: "google.com"}
      ],
      pages: [
        { icon: 'mdi-account', title: 'Alunos', to: '/admin/pais' },
        { icon: 'mdi-earth', title: 'Demandas', to: '/admin/idioma' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'UNOCHAPECO'
    }
  }
}
</script>