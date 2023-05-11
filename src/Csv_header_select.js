import React from 'react';
import { useState, useEffect } from 'react';

export function Csv_header_select({ non_mat_csv_header, set_csv_header }) {

    function handle_click_nm() {

	set_csv_header(non_mat_csv_header)

    };

    function handle_click_m() {

	set_csv_header('FULLNAME,DATE,PLACEHOLDER,DATE_MONTH,MOB,DOB,POST CODE,REFERRER NAME,PRACTICE')

    };
    
    return (
    	    <>
	    
    	    <button onClick={handle_click_nm}>Non-maternity</button>
    	    <button onClick={handle_click_m}>Maternity</button>
	    
    	    </>
    )
    
};

