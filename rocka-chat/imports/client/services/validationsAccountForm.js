import is from 'is_js';

export const ValidationsAccountForm = {
	clear(instance) {
		instance.formErrors.set('username', undefined);
		instance.formErrors.set('password', undefined);
		instance.formErrors.set('form', undefined);
	},
	validate(instance) {
		this.clear(instance);
		instance.formIsValid.set(true);

		if (!instance.formValues.get('username') || instance.formValues.get('username').length < 5 || is.not.alphaNumeric(instance.formValues.get('username'))) {
			instance.formIsValid.set(false);
			if (!instance.formValues.get('username')) {
				instance.formErrors.set('username', 'Username is required');
			} else if (instance.formValues.get('username').length < 5) {
				instance.formErrors.set('username', 'Username must be contain at least 5 characters');
			} else {
				instance.formErrors.set('username', 'Username format is invalid');
			}
		}
		if (!instance.formValues.get('password') || instance.formValues.get('password').length < 5) {
			instance.formIsValid.set(false);
			if (!instance.formValues.get('password')) {
				instance.formErrors.set('password', 'Password is required');
			} else {
				instance.formErrors.set('password', 'Password must be contain at least 5 characters');
			}
		}
		return instance.formIsValid.get();
	}
};
