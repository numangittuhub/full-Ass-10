import React from 'react';

const Footer = () => {
    // এখানে আপনার ওয়েবসাইটের সঠিক নাম দিন
    const siteName = "CleanCommunity Portal";

    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* 1. Logo / Site Name & Short Description */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-2xl font-bold text-green-400 mb-3">
                            {siteName}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            আপনার এলাকা পরিষ্কার ও বাসযোগ্য রাখতে আমরা প্রতিশ্রুতিবদ্ধ। সহজেই সমস্যা রিপোর্ট করুন এবং পরিবর্তনের অংশ হোন।
                        </p>
                    </div>

                    {/* 2. Useful Links: General */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">গুরুত্বপূর্ণ লিঙ্ক</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="text-gray-400 hover:text-green-400 transition duration-300">হোম</a></li>
                            <li><a href="/issues" className="text-gray-400 hover:text-green-400 transition duration-300">সকল সমস্যা</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-green-400 transition duration-300">আমাদের সম্পর্কে</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-green-400 transition duration-300">যোগাযোগ</a></li>
                        </ul>
                    </div>

                    {/* 3. Useful Links: User Actions */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">ব্যবহারকারী</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/add-issue" className="text-gray-400 hover:text-green-400 transition duration-300">সমস্যা যোগ করুন</a></li>
                            <li><a href="/my-issues" className="text-gray-400 hover:text-green-400 transition duration-300">আমার রিপোর্ট</a></li>
                            <li><a href="/my-contribution" className="text-gray-400 hover:text-green-400 transition duration-300">আমার কন্ট্রিবিউশন</a></li>
                            <li><a href="/login" className="text-gray-400 hover:text-green-400 transition duration-300">লগইন / রেজিস্টার</a></li>
                        </ul>
                    </div>

                    {/* 4. Social Media / Contact Info (Optional Addition) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">যোগাযোগ</h4>
                        <p className="text-gray-400 text-sm">ইমেইল: info@{siteName.toLowerCase().replace(' ', '')}.com</p>
                        <p className="text-gray-400 text-sm mt-1">ফোন: +880 1XXXXXXXXX</p>
                        
                        {/* Example: Social Icons */}
                        <div className="flex space-x-4 mt-4">
                            {/* নতুন X (Twitter) লোগো ব্যবহার করুন */}
                            <a href="#" className="text-gray-400 hover:text-green-400"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-400 hover:text-green-400"><i className="fab fa-twitter"></i></a> 
                            <a href="#" className="text-gray-400 hover:text-green-400"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} {siteName}. সর্বস্বত্ব সংরক্ষিত।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;