import { extract_dob,
	 extract_refer_date_month,
	 extract_refer_date,
	 extract_refer_name } from './extract_data.js';

test('date_ddmmyyyy', () => { 
    expect(
	extract_refer_date(
	    'Requested on : 02 MAY 2023, 10:46Patient Name'
	)
    )
	.toBe(
	    '02/05/2023'
	);
});

test('date_month', () => { 
    expect(
	extract_refer_date_month(
	    'Requested on : 01 APR 2023, 10:50Patient Name'	    
	)
    )
	.toBe(
	    'APRIL'
	);
});


test('dob', () => { 
    expect(
	extract_dob(
	    'DOB: 01 APR 1990 Age'
	)
    )
	.toBe(
	    '01/04/1990'
	);
});

test('ref_name', () => { 
    expect(
	extract_refer_name(
	    'Requesting Doctor: Bell , MadeleineConsultant in Charge'
	)
    )
	.toBe(
	    'Madeleine Bell'
	);
});

