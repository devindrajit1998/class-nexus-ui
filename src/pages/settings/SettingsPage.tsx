
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useUserRole } from "@/hooks/use-user-role";
import { ThemeToggle } from "@/components/theme-toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const { userRole, user } = useUserRole();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile settings have been updated.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings"
        description="Manage your account settings and preferences."
      />
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={userRole || ''} disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-0">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc-0">UTC</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="utc+5.5">Indian Standard Time (UTC+5:30)</SelectItem>
                    <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Theme Preference</Label>
                <div>
                  <ThemeToggle />
                </div>
              </div>
              
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about important updates
                  </p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive email alerts for important notifications
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <h3 className="font-medium pt-4">Notification Types</h3>
              
              {userRole === 'student' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">New Grades</h4>
                      <p className="text-xs text-muted-foreground">
                        Notify when new grades are posted
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">New Resources</h4>
                      <p className="text-xs text-muted-foreground">
                        Notify when new learning resources are available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </>
              )}
              
              {userRole === 'teacher' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Student Submissions</h4>
                      <p className="text-xs text-muted-foreground">
                        Notify when students submit assignments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Course Updates</h4>
                      <p className="text-xs text-muted-foreground">
                        Notify when courses are updated
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </>
              )}
              
              {userRole === 'admin' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">New Registrations</h4>
                      <p className="text-xs text-muted-foreground">
                        Notify when new users register
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">System Alerts</h4>
                      <p className="text-xs text-muted-foreground">
                        Notify about system issues or updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </>
              )}
              
              <Button onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button onClick={handleChangePassword}>
                Update Password
              </Button>
              
              <div className="pt-6">
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Enable 2FA</h4>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    onCheckedChange={() => toast({ title: "2FA Status Changed" })} 
                  />
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="font-medium mb-4">Login Sessions</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome on Windows • IP: 192.168.1.1
                      </p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  
                  <Button 
                    variant="destructive"
                    onClick={() => toast({ 
                      title: "Sessions Terminated", 
                      description: "All other sessions have been logged out." 
                    })}
                  >
                    Log Out From All Other Devices
                  </Button>
                </div>
              </div>
              
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
