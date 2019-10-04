<template>
  <b-container class="bv-example-row ">
    <b-row>
      <div class="col ">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand to="/">Userlab</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item to="/books">Books</b-nav-item>
              <b-nav-item to="/authors">Authors</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
          </b-collapse>
        </b-navbar>
      </div>
    </b-row>
    <router-view/>
  </b-container>
</template>

<style lang="scss">
</style>
