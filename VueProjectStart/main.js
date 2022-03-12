Vue.component('my-button', {
    template: '\
      <button class="normal"\
        :class="type"\
        :disabled="disabled"\
        @click="callback($event)"\
        >\
          <slot></slot>\
      </button>\
    ',
    props: {
      type: String,
      disabled: Boolean
    },
    methods: {
      callback: function(e) {
        this.$emit('click', e);
      }
    }
  });
  var vm = new Vue({
    el: '#app',
    data: {
      label: 'danger'
    },
    mounted: function() {
      // this.changeLabel();
    },
    methods: {
      toggleLable: function(e) {
        console.log(e.target.tagName);
        if (this.label == 'danger') {
          this.label = "danger-changed";
        } else {
          this.label = "danger";
        }
        //console.log(this.label);
      },
      callback: function() {
        alert('llalalala');
      }
    }
  });

  const app = new Vue({
    el: "#app",
		name: 'aselect',
		data: {
			value: 'Select a Fruit',
			list: ["Orange","Apple","Kiwi", "Lemon", "Pineapple"],
      visible: false
		},
		methods: {
			toggle() {
				this.visible = !this.visible;
			},
			select(option) {
			    this.value = option;
			}
		}
	})

    const tabs = [
        {
          name: 'Home',
          component: {
            template: `<div class="demo-tab">Home component</div>`
          }
        },
        {
          name: 'Posts',
          component: {
            template: `<div class="demo-tab">Posts component</div>`
          }
        },
        {
          name: 'Archive',
          component: {
            template: `<div class="demo-tab">Archive component</div>`
          }
        }
      ]
      
      const app = Vue.createApp({
        data() {
          return {
            tabs,
            currentTab: tabs[0]
          }
        },
      })
      
      app.mount('#dynamic-component-demo')