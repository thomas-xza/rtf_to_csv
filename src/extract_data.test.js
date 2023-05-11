import { extract_dob,
	 extract_refer_date_month,
	 extract_refer_date } from './extract_data.js';

test('valid 1', () => { 
    expect(
	extract_refer_date(
	    'Requested on : 02 MAY 2023, 10:46Patient Name'
	)
    )
	.toBe(
	    '02/05/2023'
	);
});

test('valid 2', () => { 
    expect(
	extract_refer_date_month(
	    'Requested on : 01 APR 2023, 10:50Patient Name'	    
	)
    )
	.toBe(
	    'APRIL'
	);
});


test('valid 3', () => { 
    expect(
	extract_dob(
	    'DOB: 01 APR 1990 Age'
	)
    )
	.toBe(
	    '01/04/1990'
	);
});

