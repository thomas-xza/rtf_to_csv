import React from 'react';
import { useState, useEffect } from 'react';

export function File_upload({ preloaded_files, store_preloaded_files, set_loaded_files }) {

    //  https://blog.logrocket.com/using-filereader-api-preview-images-react/

    function handle_change(event) {
	
	files_load(Array.from(event.target.files), set_loaded_files);
	
    };

    return(
	    <div>
	    <input type="file" accept=".rtf" onChange={(event) => handle_change(event)} multiple name="Choose file(s)"/> 
	    </div>
    )
    
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
