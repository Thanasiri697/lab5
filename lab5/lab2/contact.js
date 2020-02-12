let firebaseConfig = {
    apiKey: "AIzaSyDRq07H4qPYjIc2p2dfUt1LnG7mkvCfTRk",
    authDomain: "localhost",
    projectId: "lab5-1815f",
}; 

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let gpa =0;
let credit =0; 
let male =0; 
let female = 0;
let other = 0;
let sum = 0;
let gn = document.getElementsByName('gender');
let member = [];
let i = 0;

$('#submit').click(()=>{
   // console.log($('#subject').val())
   if(validation()===false){
    return;
}
else{
    db.collection("users").add({
        Name:$('#name').val(),
        Gender:Number($('input[name="gender"]:checked').val()),
        Email:$('#email').val(),
        Detail:$('#detail').val(),
    })
    .then(function(docRef) {
        $('#name').val(''),
        $('#email').val(''),
        $('#detail').val(''),
        gn[0].checked = true;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
})

$('#reset').click(()=>{
    $('#name').val('');
    gn[0].checked = true;
    $('#email').val('');
    $('#detail').val('');
})

db.collection("users").orderBy("Gender").onSnapshot(doc=>{
    let table = $('tbody')[0];
    $("tbody tr").remove()
    doc.forEach(element => {

        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        
        firstCell.textContent=element.data().Name;

        if(element.data().Gender===1){
            male=male+1;
            secondCell.textContent="Male";
        }
        if(element.data().Gender===2){
            female=female+1;
            secondCell.textContent="Female";
        }
        if(element.data().Gender===3){
            other=other+1;
            secondCell.textContent="Other";
        }
        sum = male+female+other;



        let mail = String(element.data().Email);
        let decoy="";
        for(i=0;i<mail.length;i++){
            if(i===0||mail[i]==="@"||mail[i]==="."){
                decoy+=mail[i];
            }
            else{
                decoy+="x";
                console.log("Bitched");
            }
        }
        thirdCell.textContent=decoy;


        let circle = {
            title: {
                text: "Gender Percentage"
            },
            subtitles: [{
                text: ""
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: (male/sum)*100, label: "Male" },
                    { y: (female/sum)*100, label: "Female" },
                    { y: (other/sum)*100, label: "Other" },
                ]
            }]
        };
        $("#circle").CanvasJSChart(circle);  

    })    

   
})

function validation(){
    if($('#name').val()===null||$('#name').val()===''){
        alert("please enter a name");
        return false;
    } 
    if($('#email').val().indexOf('@')<=1||($('#email').val().lastIndexOf('.')-$('#email').val().indexOf('@'))<=2||$('#email').val()===''){
        alert('Please enter valid Email');
        return false;
    }
}



    
           
    
    