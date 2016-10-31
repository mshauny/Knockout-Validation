site.page.createViewModel = function(init) {	
	site.page.viewModel = function(init) {
		if (init === undefined) init = {};
		
		var name = ko.observable(init.name).extend({ mandatory: undefined });
		var password = ko.observable(init.password).extend({ mandatory: undefined, password: undefined });
		var email = ko.observable(init.email).extend({ mandatory: undefined, email: undefined });
		var phone = ko.observable(init.phone).extend({ phone: undefined });
		var pan = ko.observable(init.pan).extend({ pan: undefined });
		var amount = ko.observable(init.amount).extend({ amount: undefined });
		var quantity = ko.observable(init.quantity).extend({ number: undefined, mandatory: undefined });
		var message = ko.observable("");
		var birthday = ko.observable(init.birthday).extend({ date: undefined });
		var createTime = ko.observable(init.createTime).extend({ time: undefined });
		var isCitizen = ko.observable(init.isCitizen).extend({ boolean: undefined });
		var requireForCitizens = function() {
			if (isCitizen() === "true" || isCitizen() === true) {
				return true;
			}
			
			return false;
		};

		var rsid = ko.observable(init.rsid).extend({ conditionalMandatory: $.validation.createConditionalMandatoryParameter(requireForCitizens, isCitizen), id_rsa: undefined });
		var hasPageError = $.validation.hasPageError;
		var showMessages = $.validation.showPageMessages;
			
	    // Special Date Validations
		var futureDateOptions = $.validation.createConditionalDateParameter(true, true, null, "Date must be in future", undefined);
		var futureDate = ko.observable(undefined).extend({ date: undefined, conditionalDate: futureDateOptions });
		
		var dateOne = ko.observable(undefined).extend({ date: undefined });
		var dateTwoOptions = $.validation.createConditionalDateParameter(true, true, dateOne, "Date must be after first selected date", undefined);
		var dateTwo = ko.observable(undefined).extend({ date: undefined, conditionalDate: dateTwoOptions });
        

		var onSubmit = function() {
			showMessages(true);
			$("#output").text("");
			
			if ($.validation.hasPageError()) {
				message("Cannot subbmit contains errors");
				return;
			}
			
			message("Example of cleaned content in submission:");		
			$("#output").text("Phone: " + phone.value() + ", PAN: " + pan.value());
		};
		
		return {
			name: name,
			password: password,
			email: email,
			phone: phone,
			pan: pan,
			amount: amount,
			quantity: quantity,
			hasPageError: hasPageError,
			showMessages: showMessages,
			onSubmit: onSubmit,
			message: message,
			isCitizen: isCitizen,
			rsid: rsid,
			birthday: birthday,
			createTime: createTime,
			futureDate: futureDate,
			dateOne: dateOne,
			dateTwo: dateTwo
		};		
	}(init);	
};