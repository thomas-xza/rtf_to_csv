import { extract_dob,
	 extract_hometel,
	 extract_fullname,
	 extract_refer_date_month,
	 extract_refer_date,
	 extract_refer_name,
	 extract_refer_dept,
	 extract_maternity_type,
	 extract_co_reading } from './extract_data.js';


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
	    'Requesting Doctor: Bell , HillaryConsultant in Charge'
	)
    )
	.toBe(
	    'Hillary Bell'
	);
});

test('fullname', () => { 
    expect(
	extract_refer_name(
	    ''
	)
    )
	.toBe(
	    ''
	);
});

test('ref_name 2', () => { 
    expect(
	extract_refer_name(
	    'Requesting Doctor: SUPATA MILVO, LIN REBEQAConsultant in Charge'
	)
    )
	.toBe(
	    'Lin Rebeqa Supata Milvo'
	);
});


test('fullname', () => { 
    expect(
	extract_fullname(
	    'Name:JEREMY, NICOLA JACKSex:'
	)
    )
	.toBe(
	    'Nicola Jack Jeremy'
	);
});


test('hometel', () => { 
    expect(
	extract_hometel(
	    'Patient Telephone:Home = 0208 555 7777, Mobile = 07555111000Hospital'
	)
    )
	.toBe(
	    '0208 555 7777'
	);
});

test('maternity type male', () => { 
    expect(
	extract_maternity_type(
	    'Sex: MaleDOB'
	)
    )
	.toBe(
	    'Partner'
	);
});

test('maternity type female', () => { 
    expect(
	extract_maternity_type(
	    'Sex: FemaleDOB'
	)
    )
	.toBe(
	    'Pregnant'
	);
});


test('co reading', () => { 
    expect(
	extract_co_reading(
	    'Carbon Monoxide Reading3Referral Smoking Comment'
	)
    )
	.toBe(
	    '3'
	);
});


test('co reading 2', () => { 
    expect(
	extract_co_reading(
	    'Carbon Monoxide Reading19'
	)
    )
	.toBe(
	    '19'
	);
});


test('co reading 3', () => { 
    expect(
	extract_co_reading(
	    'Carbon Monoxide Reading10Referral Smoking CommentReports stopping smoking a week ago'
	)
    )
	.toBe(
	    '10'
	);
});


test('refer dept', () => { 
    expect(
	extract_refer_dept(
	    'Referring SpecialityRespiratoryReferral Smoking Comment'
	)
    )
	.toBe(
	    'Respiratory'
	);
});

