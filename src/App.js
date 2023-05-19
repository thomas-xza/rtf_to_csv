import React from 'react';
import { useState, useEffect } from 'react';

import { File_upload } from './File_upload';
import { Csv_header_select } from './Csv_header_select';

import { download_data } from './download_data';
import { process_data } from './process_data';
import { objs_arr_to_json, format_data } from './format_data';

export default function App() {

    const non_mat_csv_header =
	  'DATE,PLACEHOLDER,FORENAME,SURNAME,ADDRESS,PLACEHOLDER,POST CODE,TEL,MOB,EMAIL,DOB,REFERRAL TYPE,REFERRAL SOURCE,REFERRING DEPT/ORG,PLACEHOLDER,REFERRER NAME,GP'

    const mat_csv_header =
	  'FULLNAME,REF DATE_STR,PLACEHOLDER,REF DATE_MONTH,MOB,DOB,POST CODE,CO READING,REFERRER NAME,PLACEHOLDER,PLACEHOLDER,TYPE,GP'

    const [csv_header, set_csv_header] = useState(non_mat_csv_header);

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

	    <strong>CSV header template:</strong> <br/>
	    
	    <Csv_header_select
	non_mat_csv_header={non_mat_csv_header}
	mat_csv_header={mat_csv_header}
	set_csv_header={set_csv_header}/>
	    
	    <textarea
	className='short'
	name='csv_header'
	value={csv_header}
	onChange={event => set_csv_header(event.target.value)} >
	    </textarea>

	    <br/>    
	    <br/>

	    <strong>Select RTF file(s):</strong>
	    
	    <File_upload set_loaded_files={set_loaded_files} />
	    
	    <br/>
	    <br/>

	    <strong>Data processed to CSV (automatically downloaded after file selection):</strong>
	    <br/>

	    <textarea
	className='long'
	name='csv_output'
	value={formatted_data}
	readOnly >
	    </textarea>
	    <br/>

	    <strong>Raw JSON data structures:</strong> <br/>
	    
	    <textarea
	className='long'
	name='json_data'
	value={json_data}
	readOnly >
	    </textarea>
	    
	    </>
    )

};
