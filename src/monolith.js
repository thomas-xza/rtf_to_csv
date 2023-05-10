import { React, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);


function csv_to_obj(csv_header) {

    const obj_template = {};

    csv_header.split(',').map(
	
	(field_name) => obj_template[field_name] = '' )

    return obj_template;

};

function objs_arr_to_json(objs_arr=[{}], set_data_json) {

    const pretty_objs = objs_arr.map( (obj) =>

				      JSON.stringify(obj, null, 4)

				    );

    set_data_json(pretty_objs.join("\n"));

};

function format_data(data_as_objs, csv_header) {

    const csv_header_arr = csv_header.split(',');
    
    const final_output = new Array(data_as_objs.length + 1);

    final_output[0] = csv_header;

    data_as_objs.map( (obj, index_a) => {

	const new_row = new Array(csv_header_arr.length);
	
	csv_header_arr.map( (header, index_b) => {

	    new_row[index_b] = obj[header];

	})


	final_output[index_a + 1] = new_row.join(',');

    });

    console.log(final_output);
    
    return final_output.join('\n');

};

function convert_rtf_to_plain_text(rtf) {
    
    return rtf
	.replace(/\\par[d]?/g, '')
	.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '').trim();

};

function add_data_to_objs(objs_arr) {

    console.log("add_data_to_objs", objs_arr);

    const date = new Date();

    const new_objs = objs_arr.map( (obj) => {

	obj["DATE"] = date.toLocaleDateString('en-GB', {
	    year: 'numeric',
	    month: '2-digit',
	    day: '2-digit',
	});

	obj["REFERRAL TYPE"] = "Email";

	obj["REFERRAL SOURCE"] = "UHL";

	return obj;

    })

    return new_objs;

};

function extract_data_from_rtf(new_obj, text_data) {
    
    //  this is where the application-specific knowledge is

    // console.log('text-data', typeof text_data, text_data);

    const names = text_data.match(/Name:.*Sex:/)[0]
	  .replace('Name:','')
	  .replace('Sex:', '')
	  .split(',');

    new_obj['NAME'] = names[1].trim();
    
    new_obj['SURNAME'] = names[0].trim();

    new_obj['DOB'] = text_data.match(/DOB.*Age/)[0].match(/[0-9]{4}/)[0].trim();

    const phones = text_data.match(/Telephone.*Hospital/)[0]
	  .replace('Telephone:','')
	  .replace('Hospital:','').trim();

    new_obj['MOB'] = phones.match(/Mobile = [0-9]*/)[0]
	.replace('Mobile = ','').trim();
    
    new_obj['TEL'] = phones.match(/Home = [0-9]*/)[0]
	.replace('Home = ', '').trim();

    const address = text_data.match(/Address.*Patient Telephone/)[0]
	  .replace('Address:','')
	  .replace('Patient Telephone','')
	  .split(',');

    new_obj['ADDRESS'] = address[0].trim();
    
    new_obj['POST CODE'] = address.slice(-1)[0].trim();

    new_obj["REFERRER NAME"] = text_data
	.match(/Requesting Doctor.*Consultant/)[0]
	.replace('Requesting Doctor:', '')
	.replace('Consultant', '')
	.replace(', ','').trim();

    new_obj["REFERRING DEPT/ORG"] = text_data
	.match(/Referring Speciality.*Other/)[0]
	.replace('Referring Speciality','')
	.replace('Other','')
	.replace(',','').trim();
    
    new_obj["PRACTICE"] = text_data
	.match(/Practice.*_/)[0]
	.replace('Practice:','')
	.replace(/,.*/,'').trim();
    
    return new_obj;

};

function process_data(loaded_files, csv_header) {

    // console.log('process data #1', loaded_files);
    
    
    const cleaned_data_arr = loaded_files.map( (data, index) => 
					       
					       convert_rtf_to_plain_text(data)

					     );

    console.log(cleaned_data_arr);

    const obj_template = csv_to_obj(csv_header);

    const data_as_objs_arr = cleaned_data_arr.map( (data) => 

						   extract_data_from_rtf(obj_template, data)

						 );

    console.log(data_as_objs_arr);

    // return data_as_objs_arr;

    const final_objs_arr = add_data_to_objs(data_as_objs_arr);

    console.log(final_objs_arr);

    return final_objs_arr;

};

function files_load(preloaded_files, set_loaded_files){

    let open_files = [];

    if (preloaded_files.length) {
	
	const file_readers = preloaded_files.map((file, index) => {

	    const f_reader = new FileReader();
	    
	    //  .onload stores a function to be called when file read done
	    
	    f_reader.onload = (e) => {
		
		const { result } = e.target;
		
		if (result) {
		    
		    open_files = [ ...open_files, result ];

		}

		const all_files_read = file_readers.every( function (f_r) {

		    return f_r.readyState === 2;

		});

		if (all_files_read === true) {

		    set_loaded_files(open_files);
		    
		}
		
	    }

	    //  .readAsText() initiates a file reading
	    
	    f_reader.readAsText(file);

	    return f_reader;
	    
	})

    };

}

function download_data(formatted_data) {

    console.log(formatted_data);

    if (formatted_data.split('\n').length > 1) {

	const file = new Blob([ formatted_data ], { type: 'text/csv' });

	const element = document.createElement("a");

	element.href = URL.createObjectURL(file);

	const date = new Date();

	const date_str = date.toLocaleDateString('ja-JP', {
	    year: 'numeric',
	    month: '2-digit',
	    day: '2-digit',
	})

	element.download = 'ic_data_' + date_str.replace('/','_') + '_'
	    + String(date.getHours()).padStart(2, '0')
	    + String(date.getMinutes()).padStart(2, '0')
	    +'.csv';

	document.body.appendChild(element);

	element.click();

    }
    
}

function File_upload({ preloaded_files, store_preloaded_files, set_loaded_files }) {

    //  https://blog.logrocket.com/using-filereader-api-preview-images-react/

    function handle_change(event) {
	
	files_load(Array.from(event.target.files), set_loaded_files);
	
    };

    return(
	    <div>
	    <input type="file" accept=".rtf" onChange={(event) => handle_change(event)} multiple/> 
	    </div>
    )
    
};

const App = function Main() {

    const [csv_header, set_csv_header] = useState(
        'DATE,NAME,SURNAME,ADDRESS,POST CODE,TEL,MOB,EMAIL,DOB,REFERRAL TYPE,REFERRAL SOURCE,REFERRING DEPT/ORG,REFERRER NAME,PRACTICE');

    const [loaded_files, set_loaded_files] = useState([]);

    const [json_data, set_json_data] = useState({});
    
    const [formatted_data, set_formatted_data] = useState("");
    
    useEffect(() => {

	console.log("loaded_files changed", loaded_files);

	const data_as_objs_arr = process_data(loaded_files, csv_header);

	objs_arr_to_json(data_as_objs_arr, set_json_data);
	
	set_formatted_data(format_data(data_as_objs_arr, csv_header));

    }, [loaded_files, csv_header]);

    useEffect(() => {
	
	download_data(formatted_data);

    }, [formatted_data]);

    return (
	    <>

	    <strong>CSV header:</strong> <br/>
	    <textarea className='short' name='csv_header' defaultValue={csv_header} onChange={event => set_csv_header(event.target.value)} ></textarea>
	    <br/>

	    <File_upload set_loaded_files={set_loaded_files} />
	    <br/>

	    <strong>Data processed to CSV (automatically downloaded):</strong> <br/>
	    <textarea className='long' name='csv_output' value={formatted_data} readOnly ></textarea>
	    <br/>

	    <strong>Raw JSON data structures:</strong> <br/>
	    <textarea className='long' name='json_data' value={json_data} readOnly ></textarea>
	    </>
    )

};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<App />
);
