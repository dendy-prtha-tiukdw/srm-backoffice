<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        Student Relationship Management
      </router-link>
      <span class="attribution">
        An interactive learning platform from
        <a
          rel="noopener noreferrer"
          target="blank"
          href="https://www.ukdw.ac.id/"
          >Universitas Kristen Duta Wacana</a
        >.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
