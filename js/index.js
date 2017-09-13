$('#inputPanel').on('submit', function(){
	return false;
});

function Person(sr, name = '', age = '', address = ''){
	this.sr = _.uniqueId();
	this.name = name;
	this.age = age;
	this.address = address;
}

var count = 0;

function Init(){
	var records = JSON.parse(localStorage.getItem('records'));
	_.forEach(records, function(rec){
		createTableRow(_.uniqueId(), rec.name, rec.age, rec.address);
	});
}

$('#add-btn').on('click', function(){
	var name = $('#name').val(),
		age = $('#age').val(),
		address = $('#address').val();
	if (name && age && address){
		var person = new Person(null, name, age, address),
		    store = JSON.parse(localStorage.getItem('records'));
			store = store ? store : [] ;
		    store.push(person);
		localStorage.setItem('records', JSON.stringify(store));
		
		createTableRow(person.sr, person.name, person.age, person.address);
	}
});

function createTableRow(sr, name, age, address){
		var tr, th0, th1, th2, th3, th4, attr;
		tr = document.createElement('tr'),
		attr = document.createAttribute('class');
		attr.value = 'resultRow';
		tr.setAttributeNode(attr);

		th0 = document.createElement('th'),
		attr = document.createAttribute('class');
		attr.value = 'srC '+sr;
		attr = document.createAttribute('id');
		attr.value = 'id-'+sr;
		th0.setAttributeNode(attr);

		th1 = document.createElement('th'),
		attr = document.createAttribute('class');
		attr.value = 'nameC';
		th1.setAttributeNode(attr);

		th2 = document.createElement('th'),
		attr = document.createAttribute('class');
		attr.value = 'ageC';
		th2.setAttributeNode(attr);

		th3 = document.createElement('th'),
		attr = document.createAttribute('class');
		attr.value = 'addressC';
		th3.setAttributeNode(attr);

		th4 = document.createElement('span');
		attr = document.createAttribute('class');
		attr.value = 'remove-btn';
		th4.setAttributeNode(attr);

		th0.textContent = sr;
		th1.textContent = name;
		th2.textContent = age;
		th3.textContent = address;
		th4.textContent = 'X'

		tr.appendChild(th0);
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);

	document.getElementById('resultTable').appendChild(tr);
	$(th4).one('click', function(){
		this.parentElement.remove();
		var id = this.parentElement.firstElementChild.textContent;
		var records = JSON.parse(localStorage.getItem('records'));
		records.splice(records.indexOf(parseInt(id)), 1);
		localStorage.setItem('records', JSON.stringify(records));
	});
}




Init();