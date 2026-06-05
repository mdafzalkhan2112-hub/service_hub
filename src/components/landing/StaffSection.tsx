export default function StaffSection() {
  const staff = [
    { name: 'Dr. Sarah Jenkins', role: 'Head of Operations', photo: 'https://i.pravatar.cc/300?img=1', bio: 'Oversees daily activities and ensures everything runs smoothly.' },
    { name: 'Michael Chen', role: 'Senior Manager', photo: 'https://i.pravatar.cc/300?img=11', bio: 'Specializes in member relations and community building.' },
    { name: 'Elena Rodriguez', role: 'Technical Lead', photo: 'https://i.pravatar.cc/300?img=5', bio: 'Maintains our digital infrastructure and security.' },
    { name: 'James Wilson', role: 'Support Coordinator', photo: 'https://i.pravatar.cc/300?img=8', bio: 'Your first point of contact for any assistance needed.' },
  ];

  return (
    <div id="staff" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Exceptional Team</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Dedicated professionals working around the clock to provide you with the best experience possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((person, index) => (
            <div key={index} className="glass p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary/20 group-hover:border-primary transition-colors">
                <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
                <p className="text-primary font-medium mb-4">{person.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
