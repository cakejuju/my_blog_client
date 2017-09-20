<template>
  <div class="component-example__container">
   <div class="container container--fluid">
    <div class="row">
      <div class="col xs4"><v-card class="blue darken-4 white--text">
        <v-card-row height="200px">
          <v-card-title>
            Featured Event: <br>
            May 24, 2016 <br>
            7-11pm
          </v-card-title>
          </v-card-row>
          <v-card-row actions>
            <v-btn flat class="white--text">Add to Calendar</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon dark>
              <v-icon>event</v-icon>
            </v-btn>
          </v-card-row>
        </v-card>
      </div>
      <div class="col xs4"><v-card class="blue darken-4 white--text">
        <v-card-row height="100px">
          <v-card-title>
            Featured Event: <br>
            May 24, 2016 <br>
            7-11pm
          </v-card-title>
        </v-card-row>
        <v-card-row actions>
          <v-btn flat class="white--text">Add to Calendar</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark>
            <v-icon>event</v-icon>
          </v-btn>
        </v-card-row>
        </v-card>
      </div>


      <v-col xs4 v-for="i in 3" :key="i">
        <v-card>
          <v-card-row class="green darken-1">
            <v-card-title>
              <span class="white--text">Marriot Rewards</span>
              <v-spacer></v-spacer>
              <div>
                <v-menu id="marriot" bottom left origin="top right">
                  <v-btn icon="icon" slot="activator" class="white--text">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-title>Never show rewards</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-title>Remove Card</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-title>Send Feedback</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-title>
          </v-card-row>
          <v-card-text>
            <v-card-row height="75px">
              <v-icon class="mr-5">card_membership</v-icon>
              <div>
                <div>Membership Number</div><strong>113241423</strong>
              </div>
            </v-card-row>
          </v-card-text>
          <v-card-row actions>
            <v-btn flat class="green--text darken-1">View Email</v-btn>
          </v-card-row>
        </v-card>
      </v-col>

    </div>
   </div>
  </div>
</template>

  



