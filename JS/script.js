// JavaScript Document

init();

function init(){
	var btn = document.getElementById('saveButton');
	btn.addEventListener('click', validate);
};

function validate(){
	var voornaamOK = checkRequiredField('voornaam');
	var naamOK = checkRequiredField('naam');
	var emailOK = checkEmail('email');
	
	var voornaam = document.getElementById('voornaam');
	if (!voornaamOK){		
		voornaam.className = "error";	
	}else{
		voornaam.className = "";	
	};
	
};

function checkRequiredField(fieldId){
	var control = document.getElementById(fieldId);
	
	if (!control){
		return false	
	}else{
		return true	
	};
	alert("brol");
};
//
//function checkEmail(fieldId){
//	return document.getElementById(fieldID).value.indexOf('@') > 0;
//	
//}