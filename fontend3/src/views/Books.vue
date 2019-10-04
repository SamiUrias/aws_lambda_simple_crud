<template>
  <span>
    <b-row class="">
      <b-col class="text-center font-weight-bold my-3">Add Books</b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Book Name:"
                    label-for="input-1"
                    description=""
            >
              <b-form-input
                      id="input-1"
                      v-model="form.title"
                      type="text"
                      required
                      placeholder="Enter book name"

              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Content:" label-for="input-2" description="">
              <b-form-textarea id="input-2" v-model="form.content" required
                               placeholder="Enter Content"></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
      </b-col>
    </b-row>
    <b-row v-if="booksList.length">
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="(book, index) in booksList" :key="index">{{book.title}}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </span>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Books",
        data() {
            return {
                baseEndpoint: "http://localhost:3000/",
                form: {
                    title: '',
                    content: '',
                },
                booksList: [],
                show: true
            }
        },
        async mounted() {
            let response = await axios.get(this.baseEndpoint + 'books');
            this.booksList = response.data.body
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault();
                let postResponse = await axios.post(this.baseEndpoint + 'books', this.form);
                console.log(postResponse);
                this.booksList.push(postResponse.data.body[0]);

            },
            onReset(evt) {
                evt.preventDefault();
                // Reset our form values
                this.form.name = '';
                this.form.content = '';
            }
        }
    };
</script>

<style scoped>
</style>