import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta-600 via-sunset-500 to-terracotta-800 opacity-90" />
          <div className="absolute inset-0 bg-[url('/placeholder-hotel.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-sand-100 drop-shadow-md">
              Committed to Sustainable Hospitality in Namibia
            </p>
          </div>
        </section>

        {/* ESG Storytelling Section */}
        <section className="py-16 bg-white dark:bg-sand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-6">
                Our ESG Commitment
              </h2>
              <p className="text-lg text-sand-700 dark:text-sand-300">
                At Namibian Hotels, we believe that luxury hospitality and environmental stewardship go hand in hand.
                Our commitment to Environmental, Social, and Governance (ESG) principles guides everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 rounded-lg bg-sand-50 dark:bg-sand-900">
                <div className="w-16 h-16 bg-terracotta-100 dark:bg-terracotta-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-terracotta-600 dark:text-terracotta-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-3">Environmental</h3>
                <p className="text-sand-700 dark:text-sand-300">
                  Protecting Namibia&apos;s pristine desert ecosystems through sustainable practices and conservation efforts.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg bg-sand-50 dark:bg-sand-900">
                <div className="w-16 h-16 bg-sunset-100 dark:bg-sunset-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sunset-600 dark:text-sunset-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-3">Social</h3>
                <p className="text-sand-700 dark:text-sand-300">
                  Empowering local communities through employment, education, and cultural preservation initiatives.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg bg-sand-50 dark:bg-sand-900">
                <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-3">Governance</h3>
                <p className="text-sand-700 dark:text-sand-300">
                  Maintaining the highest standards of transparency, ethics, and responsible business practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Initiatives */}
        <section className="py-16 bg-sand-50 dark:bg-sand-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-12 text-center">
              Our Sustainability Initiatives
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-sand-800 rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                  Water Conservation
                </h3>
                <p className="text-sand-700 dark:text-sand-300 mb-4">
                  In the heart of the desert, water is precious. We&apos;ve implemented comprehensive water
                  conservation measures including greywater recycling, low-flow fixtures, and native desert
                  landscaping that requires minimal irrigation.
                </p>
                <ul className="list-disc list-inside text-sand-700 dark:text-sand-300 space-y-2">
                  <li>Greywater recycling systems</li>
                  <li>Native desert landscaping</li>
                  <li>Low-flow water fixtures</li>
                  <li>Guest education programs</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-sand-800 rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                  Renewable Energy
                </h3>
                <p className="text-sand-700 dark:text-sand-300 mb-4">
                  Namibia&apos;s abundant sunshine powers our commitment to renewable energy. Our properties
                  utilize solar panels to reduce our carbon footprint and move toward energy independence.
                </p>
                <ul className="list-disc list-inside text-sand-700 dark:text-sand-300 space-y-2">
                  <li>Solar panel installations</li>
                  <li>Energy-efficient lighting</li>
                  <li>Smart building management systems</li>
                  <li>Carbon offset programs</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-sand-800 rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                  Local Community Support
                </h3>
                <p className="text-sand-700 dark:text-sand-300 mb-4">
                  We believe in giving back to the communities that welcome us. Our social initiatives focus
                  on education, employment, and preserving local culture and traditions.
                </p>
                <ul className="list-disc list-inside text-sand-700 dark:text-sand-300 space-y-2">
                  <li>Local employment opportunities</li>
                  <li>Education scholarships</li>
                  <li>Cultural preservation programs</li>
                  <li>Community infrastructure support</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-sand-800 rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                  Wildlife Conservation
                </h3>
                <p className="text-sand-700 dark:text-sand-300 mb-4">
                  Protecting Namibia&apos;s unique wildlife is central to our mission. We partner with
                  conservation organizations and implement practices that minimize our impact on local ecosystems.
                </p>
                <ul className="list-disc list-inside text-sand-700 dark:text-sand-300 space-y-2">
                  <li>Wildlife habitat protection</li>
                  <li>Conservation partnerships</li>
                  <li>Eco-tourism education</li>
                  <li>Responsible safari practices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-16 bg-gradient-to-r from-terracotta-600 to-sunset-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-white mb-2">85%</div>
                <div className="text-xl text-white/90">Renewable Energy</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-xl text-white/90">Local Employees</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">40%</div>
                <div className="text-xl text-white/90">Water Reduction</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">10+</div>
                <div className="text-xl text-white/90">Conservation Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white dark:bg-sand-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-6">
              Join Us in Our Mission
            </h2>
            <p className="text-xl text-sand-700 dark:text-sand-300 mb-8">
              When you stay with us, you&apos;re supporting sustainable tourism and community development in Namibia.
            </p>
            <a
              href="/hotels"
              className="inline-block px-8 py-4 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Book Your Stay
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

