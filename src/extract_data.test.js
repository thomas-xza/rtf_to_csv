import { extract_refer_date_month, extract_refer_date } from './extract_data.js';

test('valid date 1', () => { 
    expect(
	extract_refer_date(
	    'Requested on : 02 MAY 2023, 10:46Patient Name'
	)
    )
	.toBe(
	    '02/05/2023'
	);
});

test('valid date 2', () => { 
    expect(
	extract_refer_date_month(
	    'Requested on : 01 APR 2023, 10:50Patient Name'	    
	)
    )
	.toBe(
	    'APRIL'
	);
});

