import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, DollarSign, Briefcase, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const { toast } = useToast();

  const jobTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'full-time', name: 'Full Time' },
    { id: 'part-time', name: 'Part Time' },
    { id: 'contract', name: 'Contract' },
    { id: 'internship', name: 'Internship' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'pune', name: 'Pune' },
    { id: 'hyderabad', name: 'Hyderabad' }
  ];

  const experienceLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'fresher', name: 'Fresher (0-1 years)' },
    { id: 'junior', name: 'Junior (1-3 years)' },
    { id: 'mid', name: 'Mid Level (3-5 years)' },
    { id: 'senior', name: 'Senior (5+ years)' }
  ];

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Mumbai",
      type: "full-time",
      experience: "junior",
      salary: "₹4-8 LPA",
      description: "We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for creating user-friendly web applications.",
      requirements: ["React.js", "JavaScript", "HTML/CSS", "Git"],
      postedDate: "2 days ago",
      applicants: 45,
      verified: true
    },
    {
      id: 2,
      title: "Digital Marketing Specialist",
      company: "Growth Marketing Inc",
      location: "Delhi",
      type: "full-time",
      experience: "mid",
      salary: "₹5-10 LPA",
      description: "Join our marketing team to drive digital campaigns and grow our online presence across multiple channels.",
      requirements: ["SEO/SEM", "Social Media", "Analytics", "Content Marketing"],
      postedDate: "1 day ago",
      applicants: 32,
      verified: true
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "DataTech Analytics",
      location: "Bangalore",
      type: "internship",
      experience: "fresher",
      salary: "₹15,000/month",
      description: "Great opportunity for fresh graduates to start their career in data analysis and business intelligence.",
      requirements: ["Python", "SQL", "Excel", "Statistics"],
      postedDate: "3 days ago",
      applicants: 78,
      verified: false
    },
    {
      id: 4,
      title: "Senior Software Engineer",
      company: "Innovation Labs",
      location: "Pune",
      type: "full-time",
      experience: "senior",
      salary: "₹12-18 LPA",
      description: "Lead technical projects and mentor junior developers in a fast-paced startup environment.",
      requirements: ["Node.js", "React", "MongoDB", "AWS", "Leadership"],
      postedDate: "1 week ago",
      applicants: 23,
      verified: true
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Creative Studio",
      location: "Hyderabad",
      type: "contract",
      experience: "mid",
      salary: "₹6-12 LPA",
      description: "Create beautiful and intuitive user experiences for web and mobile applications.",
      requirements: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      postedDate: "4 days ago",
      applicants: 56,
      verified: true
    },
    {
      id: 6,
      title: "Content Writer",
      company: "Media House",
      location: "Mumbai",
      type: "part-time",
      experience: "junior",
      salary: "₹20,000/month",
      description: "Write engaging content for blogs, social media, and marketing materials.",
      requirements: ["Writing Skills", "SEO Knowledge", "Research", "Creativity"],
      postedDate: "5 days ago",
      applicants: 67,
      verified: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || job.location.toLowerCase() === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesExperience = selectedExperience === 'all' || job.experience === selectedExperience;
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  const handleApply = (job) => {
    toast({
      title: "Application Required",
      description: "🚧 Job application isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Jobs - Reticulation</title>
        <meta name="description" content="Find your dream job at Reticulation. Browse verified job listings across various industries and locations. Register for just ₹49 to apply." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl font-bold">Find Your Dream Job</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Discover verified job opportunities from top companies. Register for just ₹49 and start your career journey.
            </p>
            <Link to="/job-registration">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4">
                Register for Job @ ₹49
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {jobTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {experienceLevels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Stats */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2,500+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">10,000+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <div className="text-sm text-gray-500">
              Updated 2 hours ago
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow card-hover"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          {job.verified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-purple-600 font-medium">{job.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.experience.charAt(0).toUpperCase() + job.experience.slice(1)}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.slice(0, 4).map((req, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 4 && (
                        <span className="text-gray-500 text-xs">
                          +{job.requirements.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Posted {job.postedDate}</span>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.applicants} applicants
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                    <Button
                      onClick={() => handleApply(job)}
                      className="btn-gradient text-white px-6 py-2"
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 py-2"
                    >
                      Save Job
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Ready to Start Your Career Journey?</h2>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Register now for just ₹49 and get access to all job opportunities with verified companies.
            </p>
            <Link to="/job-registration">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4">
                Register Now @ ₹49
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Jobs;