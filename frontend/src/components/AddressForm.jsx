import { useState } from 'react';

function AddressForm({ onSubmit, initialData = {} }) {
    const [formData, setFormData] = useState({
        fullName: initialData.fullName || '',
        phone: initialData.phone || '',
        addressLine1: initialData.addressLine1 || '',
        addressLine2: initialData.addressLine2 || '',
        city: initialData.city || '',
        state: initialData.state || '',
        zipCode: initialData.zipCode || '',
        country: initialData.country || 'United States',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = 'Street address is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }
        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'ZIP Code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
            newErrors.zipCode = 'Please enter a valid ZIP Code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const inputClasses = (fieldName) => `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff9900] focus:border-transparent
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
  `;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name (First and Last name)
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClasses('fullName')}
                />
                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className={inputClasses('phone')}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street address
                </label>
                <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Street address or P.O. Box"
                    className={inputClasses('addressLine1')}
                />
                {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apt, suite, unit, building, floor, etc.
                </label>
                <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className={inputClasses('addressLine2')}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClasses('city')}
                    />
                    {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                    </label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={inputClasses('state')}
                    />
                    {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={inputClasses('zipCode')}
                    />
                    {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                    </label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={inputClasses('country')}
                    >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="India">India</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors mt-6"
            >
                Use this address
            </button>
        </form>
    );
}

export default AddressForm;
