import { React, useState, useEffect } from 'react';


export function download_data(formatted_data) {

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
