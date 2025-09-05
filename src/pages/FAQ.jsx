import React,{useState} from 'react';
import Hero from '../components/Hero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiChevronDown,FiChevronUp}=FiIcons;

const FAQ=()=> {
  const [openItems,setOpenItems]=useState([]);

  const toggleItem=(index)=> {
    setOpenItems(prev=> 
      prev.includes(index) 
        ? prev.filter(i=> i !==index) 
        : [...prev,index]
    );
  };

  const faqs=[
    {
      question: 'How fast can you start?',
      answer: 'Often within a few days;small jobs even sooner. We prioritize quick response times and can usually accommodate urgent requests within 24-48 hours.'
    },
    {
      question: 'Do you give estimates by text?',
      answer: 'Yes—send photos and a task list for a quick ballpark estimate. For detailed work,hourly rates provide exact pricing. Text estimates help you plan your budget quickly.'
    },
    {
      question: 'Is the AI really 24/7?',
      answer: 'Yes (Beta). Our AI assistant is available around the clock to take your initial booking information. A human technician reviews all bookings to confirm details and scheduling.'
    },
    {
      question: 'Do I need to buy materials?',
      answer: 'Either way works—we can purchase materials for you or use materials you\'ve already bought. We\'ll discuss the best approach based on your project and preferences.'
    },
    {
      question: 'Are you insured and experienced?',
      answer: 'Yes—we have 15 years of hands-on experience with owner-led service and carry full liability insurance.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'Charlotte,Ballantyne,Mint Hill,Pineville,Matthews,and nearby communities. Contact us if you\'re unsure about your specific location—we may be able to serve additional areas.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash,check,and all major credit cards. Payment is typically due upon completion of work,and we provide detailed invoices for all services.'
    },
    {
      question: 'Do you offer warranties on your work?',
      answer: 'Yes,we stand behind our work with appropriate warranties depending on the type of service. We\'ll discuss warranty terms before starting any project.'
    },
    {
      question: 'Can you work on weekends?',
      answer: 'Yes,we offer weekend appointments to accommodate your schedule. Weekend slots may have limited availability,so we recommend booking in advance.'
    },
    {
      question: 'What if I need to reschedule?',
      answer: 'We understand that schedules change. Please give us as much notice as possible,and we\'ll work with you to find a new time that works for both parties.'
    }
  ];

  return (
    <div className="bg-white">
      <section className="pt-2 pb-0 text-center mb-3 space-y-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-1">Frequently Asked Questions</h1>
          <p className="text-primary-600">Find answers to common questions about our handyman services,booking process,and policies.</p>
        </div>
      </section>

      <section className="py-1 lg:py-2 -space-y-10 pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq,index)=> (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-200"
              >
                <button
                  onClick={()=> toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-180"
                >
                  <h3 className="text-lg font-semibold text-primary-800 pr-4">
                    {faq.question}
                  </h3>
                  <SafeIcon 
                    icon={openItems.includes(index) ? FiChevronUp : FiChevronDown} 
                    className="w-5 h-5 text-primary-600 flex-shrink-0" 
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-primary-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-primary-600 mb-6">
              Don't see your question answered here? We're happy to help with any additional questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+19803167792" 
                className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 focus:bg-green-500 transition-all duration-180 font-medium"
              >
                Call 980‑316‑7792
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-green-500 hover:text-white hover:border-green-500 focus:bg-green-500 focus:text-white focus:border-green-500 transition-all duration-180 font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;