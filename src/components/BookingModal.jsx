import React, { useState, useEffect } from 'react';
import { getAddresses, getSeats, submitBooking } from '../api';
import { MOCK_ADDRESSES, MOCK_SEATS } from '../utils/mockData';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  addressOther: '',
  seats: '',
  pickupDate: '',
  pickupTime: '',
  dropoffDate: '',
  dropoffTime: '',
  decoration: 'no',
  decorationDetails: '',
  notes: '',
};

export default function BookingModal({ isOpen, onClose, selectedCar }) {
  const [form, setForm] = useState(initialForm);
  const [addresses, setAddresses] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    // Try API, fallback to mock
    getAddresses()
      .then((r) => setAddresses(r.data))
      .catch(() => setAddresses(MOCK_ADDRESSES));
    getSeats()
      .then((r) => setSeats(r.data))
      .catch(() => setSeats(MOCK_SEATS));
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setSuccess(false);
      setError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        carName: selectedCar?.name || '',
        address: form.address === 'other' ? form.addressOther : form.address,
      };
      await submitBooking(payload);
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to send booking request. Please try again.');
      } else {
        setError('Unable to connect to the server. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(1,45,29,0.45)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col md:flex-row"
        style={{ boxShadow: '0 32px 64px -12px rgba(1,45,29,0.3)' }}
      >
        {/* Left panel */}
        <div className="hidden md:flex md:w-2/5 relative bg-primary overflow-hidden flex-col">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQie2n9aV1Z9HBHoUE0qhlP20niFEyUO9H3i_97SbdcWATpmluuVenAH6vBfpK2C-Odkbll-F0zYQjBEks_pZcAeAh9zGZV_1xwBuxAG48TeP78ecDxlRXzNpqOFCRJTbDe1YQXBe8xWY4dQHn9NNKZ32doybvFPN-2YjhRjN44c288SxZYb5MTKpEHIPfSKdmJbhX0NkNKY7FldWILi7Cp4k2TLXtxpKrFkn-zRnezKIxv0QIgliwwHc2dVuhoQs7A5Ik1wZ24A6V"
            alt="Golf car interior"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 p-8 flex flex-col h-full justify-between text-white">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">Reserve Your Experience</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Secure your premium transport and enjoy the leisure of the greens without effort.
              </p>
              {selectedCar && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Selected Car</p>
                  <p className="font-semibold">{selectedCar.name}</p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {[
                { icon: 'verified_user', label: 'Insured Fleet' },
                { icon: 'electric_car', label: 'Fully Charged' },
                { icon: 'support_agent', label: '24/7 Support' },
              ].map(({ icon, label }) => (
                <div key={icon} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a5d0b9]">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex-1 p-6 md:p-8 relative overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {success ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4">
              <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary">Booking Request Sent!</h3>
              <p className="text-zinc-500 max-w-sm">We've received your request and will contact you shortly to confirm your booking.</p>
              <button onClick={onClose} className="mt-4 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-2">
                <h3 className="font-serif text-2xl font-semibold text-primary">Booking Details</h3>
                <p className="text-zinc-400 text-sm mt-1">Fill out the information below to confirm your rental.</p>
              </div>

              {error && (
                <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required>
                  <input type="text" placeholder="John Doe" value={form.fullName} onChange={set('fullName')} required className="input-field" />
                </FormField>
                <FormField label="Email Address" required>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} required className="input-field" />
                </FormField>
                <FormField label="Phone Number" required>
                  <input type="tel" placeholder="+501 600 0000" value={form.phone} onChange={set('phone')} required className="input-field" />
                </FormField>
                {/* Seats dropdown */}
                <FormField label="Number of Seats" required>
                  <select value={form.seats} onChange={set('seats')} required className="input-field">
                    <option value="">Select seats...</option>
                    {seats.map((s) => (
                      <option key={s.id} value={s.value}>{s.value}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              {/* Address */}
              <FormField label="Pickup Location" required>
                <select value={form.address} onChange={set('address')} required className="input-field">
                  <option value="">Select location...</option>
                  {addresses.map((a) => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                  <option value="other">Other (specify below)</option>
                </select>
              </FormField>
              {form.address === 'other' && (
                <FormField label="Custom Address" required>
                  <input type="text" placeholder="Enter your address..." value={form.addressOther} onChange={set('addressOther')} required className="input-field" />
                </FormField>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Pickup Date" required>
                  <input type="date" value={form.pickupDate} onChange={set('pickupDate')} required min={new Date().toISOString().split('T')[0]} className="input-field" />
                </FormField>
                <FormField label="Pickup Time" required>
                  <input type="time" value={form.pickupTime} onChange={set('pickupTime')} required className="input-field" />
                </FormField>
                <FormField label="Drop-off Date" required>
                  <input type="date" value={form.dropoffDate} onChange={set('dropoffDate')} required min={form.pickupDate || new Date().toISOString().split('T')[0]} className="input-field" />
                </FormField>
                <FormField label="Drop-off Time" required>
                  <input type="time" value={form.dropoffTime} onChange={set('dropoffTime')} required className="input-field" />
                </FormField>
              </div>

              {/* Decoration */}
              <FormField label="Decoration">
                <div className="flex gap-4 mt-1">
                  {['yes', 'no'].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decoration"
                        value={v}
                        checked={form.decoration === v}
                        onChange={set('decoration')}
                        className="accent-primary"
                      />
                      <span className="font-sans text-sm capitalize">{v}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              {form.decoration === 'yes' && (
                <FormField label="Decoration Details">
                  <input type="text" placeholder="Describe the decoration you'd like..." value={form.decorationDetails} onChange={set('decorationDetails')} className="input-field" />
                </FormField>
              )}

              {/* Notes */}
              <FormField label="Additional Notes">
                <textarea
                  rows={3}
                  placeholder="Any special requests or information..."
                  value={form.notes}
                  onChange={set('notes')}
                  className="input-field resize-none"
                />
              </FormField>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-white rounded-lg font-semibold tracking-wide hover:bg-secondary transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">send</span>
                    Send Booking Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans font-semibold text-sm text-primary tracking-wide">
        {label}{required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
