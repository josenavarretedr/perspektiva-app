
const JSON_PERSPEKTIVA = 'data.json'

const app = Vue.createApp({
  data() {
    return {
      DOCS_ID: ['DNI', 'Carné de Extranjería', 'Pasaporte', 'CPP', 'Cédula de Identidad', 'PTP'],
      message: "Bienvenidos al Programa Haz Realidad tu negocio",
      DOC_ID_SELECTED: '',
      numDocId: '',
      currentUser: null,
      graduado: false,
      concurso: false,
      arrHB: [],
      arrEF: [],
      arrCF: [],
      arrAE: [],
      arrMK: [],
      arrPLN: [],
      arrAS: [],
      avaibleCourses: [],
      proxModulos: [
        {
          id: 'HB',
          name: 'Habilidades blandas',
          profesor: 'Jose navarrete',
          link: 'http://www.google.com',
          dias: ['Lunes', 'Miercoles', 'Jueves'],
          horario: '7pm a 9pm'
        },
        {
          id: 'EF',
          name: 'Educación financiera',
          profesor: 'Pilar Obregon',
          link: 'http://www.hola.com',
          dias: ['Lunes', 'Miercoles', 'Jueves'],
          horario: '7pm a 9pm'
        },
        {
          id: 'CF',
          name: 'Costos y finanzas',
          profesor: 'Yuffre Ramos',
          link: 'http://www.hola.com',
          dias: ['Lunes', 'Miercoles', 'Jueves'],
          horario: '7pm a 9pm'
        },
        {
          id: 'AE',
          name: 'Administración de emprensas',
          profesor: 'Juan Alva',
          link: 'http://www.hola.com',
          dias: ['Lunes', 'Miercoles', 'Jueves'],
          horario: '7pm a 9pm'
        },
        {
          id: 'MK',
          name: 'Marketing y ventas',
          profesor: 'Luz Campana',
          link: 'http://www.hola.com',
          dias: ['Lunes', 'Miercoles', 'Jueves'],
          horario: '7pm a 9pm'
        }
      ]
    };
  },
  methods: {
    async buscar() {
      this.clearArrs();
      async function callDataPersketiva() {
        const response = await fetch(JSON_PERSPEKTIVA);
        const data = await response.json();
        // console.log(data)
        return data;
      }
      const dataGeneral = await callDataPersketiva();

      let currentUser = dataGeneral
        .filter(user => user['DOC_ID'] === this.DOC_ID_SELECTED && user['NUM_DOC_ID'] === this.numDocId)[0];
      console.log(currentUser);

      this.currentUser = currentUser;

      this.makeArrs('arrHB',currentUser.HB1,currentUser.HB2,currentUser.HB3,currentUser.HB4);
      
      this.makeArrs('arrEF',currentUser.EF1,currentUser.EF2,currentUser.EF3,currentUser.EF4);

      this.makeArrs('arrCF',currentUser.CF1,currentUser.CF2,currentUser.CF3,currentUser.CF4);

      this.makeArrs('arrAE',currentUser.AE1,currentUser.AE2,currentUser.AE3,currentUser.AE4);

      this.makeArrs('arrMK',currentUser.MK1,currentUser.MK2,currentUser.MK3,currentUser.MK4);

      this.makeArrs('arrPLN', currentUser.PLN1,currentUser.PLN2,currentUser.PLN3,currentUser.PLN4, currentUser.PLN5,currentUser.PLN6,currentUser.PLN7,currentUser.PLN8)

      this.makeArrs('arrAS', currentUser.AS1,currentUser.AS2,currentUser.AS3)

      this.proxMod()

      this.estadoEmprendimiento()
    },

    makeArrs(nameArr,a,b,c,d,e,f,g,h){
      let inicialArr = []
      let midArr = []
      if(e){
        inicialArr = [a,b,c,d,e,f,g,h];
      } else {
        inicialArr = [a,b,c,d]
      }
      for(let i = 0; i < inicialArr.length; i++){
        if(inicialArr[i] === '' || inicialArr[i] === null || inicialArr[i] === undefined){
          midArr.push(false);
        } else {
          midArr.push(true);
        }
      }

      this[nameArr] = midArr;
    },
    makeCuteArr(e){
      if(e === true){
        return '✅'
      } else {
        return '❌'
      }
    },
    proxMod(){
      if (this.arrHB.filter(Boolean).length < 3){
        this.avaibleCourses.push('HB')
      } else if (this.arrPLN.filter(Boolean).length >=6 && this.arrHB.filter(Boolean).length >=3 ){
          
          switch (this.arrEF.filter(Boolean).length <= 3){
            case true:
              this.avaibleCourses.push('EF');
              break;
            case false:
              break;
          }

          switch (this.arrCF.filter(Boolean).length <= 3){
            case true:
              this.avaibleCourses.push('CF');
              break;
            case false:
              break;
          }

          switch (this.arrAE.filter(Boolean).length <= 3){
            case true:
              this.avaibleCourses.push('AE');
              break;
            case false:
              break;
          }

          switch (this.arrMK.filter(Boolean).length <= 3){
            case true:
              this.avaibleCourses.push('MK');
              break;
            case false:
              break;
          }

      } else {
        this.avaibleCourses.push('PLN')
      }
    },
    estadoEmprendimiento(){
      switch (!this.avaibleCourses.includes('HB') && !this.avaibleCourses.includes('PLN')){
        case true:
          this.graduado = true;
          break;
      }

      switch (this.avaibleCourses.length === 0){
        case true:
          this.concurso = true;
          break;
      }

    },
    clearArrs(){
      this.currentUser = null;
      this.arrHB = [];
      this.arrEF = [];
      this.arrCF = [];
      this.arrAE = [];
      this.arrMK = [];
      this.arrPLN = [];
      this.arrAS = [];
      this.avaibleCourses = [];
    }
  }
})

app.mount("#app");


// "DOC_ID": "Carné de Extranjería",
//"NUM_DOC_ID": "004027831",

// "DOC_ID": "Pasaporte",
// "NUM_DOC_ID": "49572795",