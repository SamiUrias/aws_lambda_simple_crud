<template>
  <span>
    <b-row>
      <b-col class="text-center font-weight-bold">Add Author</b-col>
    </b-row>
    <b-row class="mb-3">
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
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="Enter author name"

              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
<!--          <b-card class="mt-3" header="Form Data Result">-->
<!--            <pre class="m-0">{{ form }}</pre>-->
<!--          </b-card>-->

      </b-col>
    </b-row>
    <b-row v-if="authorsList.length">
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="(author, index) in authorsList" :key="index">{{author.name}}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </span>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Authors",
        data() {
            return {
                baseEndpoint: "http://localhost:3000/",
                form: {
                    name: '',
                },
                authorsList: [],
                show: true
            }
        },
        async mounted() {
            let response = await axios.get(this.baseEndpoint + 'authors');
            this.authorsList = response.data.body
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault();
                let postResponse = await axios.post(this.baseEndpoint + 'authors', this.form)
                console.log(postResponse)
                this.authorsList.push(postResponse.data.body[0])

            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.name = ''
                this.form.content = ''

            }
        }
    };
</script>

<style scoped>
</style>