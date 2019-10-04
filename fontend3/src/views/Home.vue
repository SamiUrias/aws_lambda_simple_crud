<template>

  <span>
    <b-row v-if="authorList.length" >
      <b-col>
        <b-list-group>
         <span v-for="(author, index) in authorList" :key="index">
            <b-list-group-item >{{author.name}}</b-list-group-item>
            <b-list-group-item class="book-padding" v-if="author.books.length" v-for="(book,bookIndex) in author.books" :key="bookIndex">{{book.title}}</b-list-group-item>
         </span>
        </b-list-group>
      </b-col>
    </b-row>
  </span>


</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'home',
  data() {
    return {
      baseEndpoint: "http://localhost:3000/",
      authorList: [],
      text:'Text'
    }
  },
  async mounted() {
    let response = await axios.get(this.baseEndpoint + 'authors');
    console.log(response);
    this.authorList = response.data.body
  },
}
</script>
<style>
  .list-group-item.book-padding {
    padding-left: 50px;
  }
</style>
