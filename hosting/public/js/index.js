firebase.initializeApp({
    apiKey: 'AIzaSyDaYjDOrFNAErIJXaDTBU4CwfM7Tf3cJGk',
    authDomain: 'AAAAn5tpLuM:APA91bETRWH0zvm2s_RSrY1mNFPDJP2D8C9rhSNQF_uFUJK19TiMh7lk3YFpGyUXz7qNtdMTUpexptfT_Q3kI5cwIkWF4iIjBQad3rhA9Ip_adEw5dTtgJtJX7ANMWFYu4mzZOp0-hFx',
    projectId: 'servimart-eb0f1',
    storageBucket: "servimart-eb0f1.appspot.com",
  });
  var storageRef = firebase.storage().ref();
  function showLugares(){
    var db = firebase.firestore();
    db.collection("paquetes").get().then(function(querySnapshot) {
        var text='';
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var option = document.createElement('option');
            var text1 = document.createTextNode(doc.data().destino); 
            option.appendChild(text1);
            document.getElementById('site').appendChild(option);
            
        });
        //document.getElementById('d2').innerHTML=text
    });
}
var storageRef = firebase.storage().ref();

function showPaquetes(){
    var db = firebase.firestore();
    db.collection("paquetes").get().then(function(querySnapshot) {
        var text='';
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            /**<div class="grid_4">
						<div class="banner">
							<img src="images/page2_img1.jpg" alt="">
							<div class="label">
								<div class="title">DESTINO</div>
								<div class="price">A<span>$ 1.200</span></div>
								<a href="#">LEARN MORE</a>
							</div>
						</div>
                    </div> */
                    var br = document.createElement('br');
            var div1 = document.createElement('div');
            div1.className='col-md-10 row'
            var div2 = document.createElement('div');
            div2.className='banner col-md-5'
            var h3 = document.createElement('h3');
            var text1 = document.createTextNode(doc.data().destino);
            h3.appendChild(text1);
            document.getElementById('banners').appendChild(h3);
            var img = document.createElement('img');
            storageRef.child('photos/'+doc.data().imagen).getDownloadURL().then(function(url) {
                var test = url;
                img.src = test;

            }).catch(function(error) {

            });
            div2.appendChild(img);
            var div3 = document.createElement('div');
            div3.className='label'
            var div4 = document.createElement('div');
            div4.className='title'
            var text1 = document.createTextNode(doc.data().destino); 
            div4.appendChild(text1);
            var a = document.createElement('div');
            var text1 = document.createTextNode('Reservar'); 
            a.appendChild(text1);
            div3.appendChild(div4);
            div3.appendChild(a);
            div2.appendChild(div3);
            div1.appendChild(div2);
            var div4 = document.createElement('div');
            var div5 = document.createElement('div');
            div5.innerHTML=doc.data().descripcion
            div4.className='col-md-5'
            var p = document.createElement('p');
            //p.innerHTML(doc.data().descripcion);
            div4.appendChild(br);
            var h4 = document.createElement('h4');
            var text1 = document.createTextNode('Descripción'); 
            h4.appendChild(text1);
            div4.appendChild(h4);
            div4.appendChild(div5);
            div1.appendChild(div4);
            document.getElementById('banners').appendChild(div1)
        });
        //document.getElementById('d2').innerHTML=text
    });
}

function reserva(){
    name=document.getElementById('nombre').value;
    destino=document.getElementById('site').value;
    email=document.getElementById('email').value;
    telefono=document.getElementById('telefono').value;
    llegada=document.getElementById('llegada').value;
    salida=document.getElementById('salida').value;
    adultos=document.getElementById('adultos').value;
    niños=document.getElementById('niños').value;
    habitaciones=document.getElementById('habitaciones').value;
    edades=document.getElementById('edades').value;
    mensaje=document.getElementById('mensaje').value;
    textReserva='-Nombre: '+name+' -Destino: '+destino+' -Llegada: '+llegada+' -Salida: '+salida+' -Nº adultos: '+
    adultos+' -Nº niños: '+niños+' -Edades: '+edades+' -Habitaciones: '+habitaciones
      
      var db = firebase.firestore();
      db.collection("reservas").add({
          nombre: name,
          destino: destino,
          email: email,
          telefono:telefono,
          llegada: llegada,
          salida: salida,
          adultos: adultos,
          niños: niños,
          habitaciones: habitaciones,
          edades: edades,
          mensaje: mensaje,
      })
      .then(function(docRef) {
        var db = firebase.firestore();
        db.collection("noticias").add({
            titulo: "Reserva",
            descripcion: '<div style="width: 100%; ">\
                <h2>Tienes una nueva reserva</h2>\
                <div style="width: 100%; margin: auto;">\
                    <p><Strong>Nombre:</Strong> '+name+'</p>\
                    <p><Strong>Telefono:</Strong> '+telefono+'</p>\
                    <p><Strong>Email:</Strong> '+email+'</p>\
                    <p><Strong>Datos:</Strong> '+textReserva+'</p>\
                    <p><Strong>Mensaje:</Strong> '+mensaje+'</p>\
                </div>\
            </div>\
        </div>'
              

        })
        .then(function(docRef) {
            //alert("Contacto exitoso, en breve nos contactaremos contigo")
            //console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
          var db = firebase.firestore();
        db.collection("mail").add({
            to: "napandalesr@gmail.com",
            message: {
                subject:"Reserva",
                text:textReserva,
                html:'<div style="width: 100%; ">\
                  <div style="width: 50%; margin: auto;">\
                  <img src="https://servimart-eb0f1.web.app/images/logo%20servimart.png" style="width: 200px; margin: auto;"  alt="">\
                  <div>\
                      <h2>Tienes una nueva reserva</h2>\
                      <div style="width: 100%; margin: auto;">\
                          <p><Strong>Nombre:</Strong> '+name+'</p>\
                          <p><Strong>Telefono:</Strong> '+telefono+'</p>\
                          <p><Strong>Email:</Strong> '+email+'</p>\
                          <p><Strong>Datos:</Strong> '+textReserva+'</p>\
                          <p><Strong>Mensaje:</Strong> '+mensaje+'</p>\
                      </div>\
                  </div>\
              </div>'
              }

        })
        .then(function(docRef) {
            var db = firebase.firestore();
        db.collection("mail").add({
            to: email,
            message: {
                subject:"Reserva",
                text:textReserva,
                html:'<div style="width: 100%; ">\
                  <div style="width: 50%; margin: auto;">\
                  <img src="https://servimart-eb0f1.web.app/images/logo%20servimart.png" style="width: 200px; margin: auto;"  alt="">\
                  <div>\
                      <h2>Gracias por contactarnos. Resivimos tu reserva, en breve nos pondremos en contacto</h2>\
                      <div style="width: 100%; margin: auto;">\
                          <p><Strong>Nombre:</Strong> '+name+'</p>\
                          <p><Strong>Email:</Strong> '+email+'</p>\
                          <p><Strong>Telefono:</Strong> '+telefono+'</p>\
                          <p><Strong>Datos:</Strong> '+textReserva+'</p>\
                          <p><Strong>Mensaje:</Strong> '+mensaje+'</p>\
                      </div>\
                  </div>\
              </div>'
              }

        })
        .then(function(docRef) {
            alert("Contacto exitoso, en breve nos contactaremos contigo")
            //console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
            //console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
}
var idDoc;
var e=0;
function showLugares2(){
    var db = firebase.firestore();
    db.collection("ofertas").get().then(function(querySnapshot) {
        var text='';
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var li = document.createElement('li');
            var a = document.createElement('a');
            var text1 = document.createTextNode(doc.data().destino); 
            a.href="#"
            a.appendChild(text1);
            li.appendChild(a);
            document.getElementById('listar').appendChild(li);
            e++;
            if(e==1){
                preOferta(doc.id)
            }
        });
        //document.getElementById('d2').innerHTML=text
    });
}



function preOferta(idd){
    idDoc=idd
    oferta()
}

function oferta(){
    var db = firebase.firestore();
    console.log(idDoc)
    var docRef = db.collection("ofertas").doc(idDoc);


docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var div = document.createElement('div');
        div.style.width='250px'
        
        var img = document.createElement('img');
        img.className='img_inner fleft'
        
        storageRef.child('especiales/'+doc.data().imagen).getDownloadURL().then(function(url) {
            var test = url;
            img.src = test;

        }).catch(function(error) {

        });
        img.style.width='100%'
        div.appendChild(img)
        var br = document.createElement('br');
        var div1 = document.createElement('div');
        div1.className='extra_wrapper'
        div1.appendChild(div)
        var div2 = document.createElement('div');
        div2.className='text1 col1'
        var text1 = document.createTextNode(doc.data().destino); 
        div2.appendChild(text1)
        var p = document.createElement('p');
        var text1 = document.createTextNode('Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur provident nisi repellat commodi culpa non porro cupiditate saepe magnam laborum, obcaecati ducimus aperiam, tempora, eligendi laudantium nulla ab iure quaerat'); 
        p.appendChild(text1)
        div2.appendChild(p)
        div2.appendChild(br)
        var a = document.createElement('a');
        a.className='link1'
        a.href='#'
        var text1 = document.createTextNode('Reservar'); 
        a.appendChild(text1)
        div2.appendChild(a)
        div1.appendChild(div2)
        document.getElementById('block2').appendChild(div1)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}