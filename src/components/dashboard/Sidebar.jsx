import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const Sidebar = ({ userType, userName, navLinks }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleLinkClick = (e, href) => {
    if (href === '#') {
      e.preventDefault();
      toast({
        title: "Feature In Progress",
        description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      });
    }
  };

  return (
    <aside className="w-full md:w-64 bg-card p-6 flex flex-col border-r">
      <div className="flex items-center space-x-4 mb-8">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`} alt={userName} />
          <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-card-foreground">{userName}</p>
          <p className="text-sm text-primary">{userType}</p>
        </div>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive && link.href !== '#'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-destructive/80 hover:text-destructive-foreground" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;