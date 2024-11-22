import React from "react";
import { Card, CardContent} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
import { Link } from "react-router-dom";

const ProfileSettingsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-md bg-white">
                <div className="tab-pane fade active show" id="account-general">
                    {/* Profile Avatar Section */}
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="w-20 h-20 rounded-full">
                            <img
                                src="#" /*Add a profile picture link here*/
                                alt="Profile Picture"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </Avatar>
                        <div className="ml-4">
                            <Label className="btn btn-outline-primary cursor-pointer">
                                Upload new photo
                                <Input
                                    type="file"
                                    className="hidden"
                                    accept=".jpg,.jpeg,.png,.gif"
                                />
                            </Label>
                            <Button variant="ghost" className="ml-2">
                                Reset
                            </Button>
                            <p className="text-gray-500 text-sm mt-2">
                                Allowed JPG, GIF, or PNG. Max size: 800KB
                            </p>
                        </div>
                    </CardContent>
                    <hr className="border-gray-200" />

                    {/* User Information Section */}
                    <CardContent>
                        <div className="grid gap-4">
                            {/* Username Field */}
                            <div className="form-group">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    defaultValue="nmaxwell"
                                    className="mb-2"
                                />
                            </div>

                            {/* Name Field */}
                            <div className="form-group">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    defaultValue="Nelle Maxwell"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="nmaxwell@mail.com"
                                    className="mb-2"
                                />
                                <Alert className="bg-yellow-100 border border-yellow-400 text-yellow-700 mt-2 p-4 rounded">
                                    Your email is not confirmed. Please check your inbox.
                                    <br />
                                    <a href="#" className="text-blue-500 underline">
                                        Resend confirmation
                                    </a>
                                </Alert>
                            </div>

                            {/* Company Field */}
                            <div className="form-group">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    defaultValue="Company Ltd."
                                />
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default ProfileSettingsPage;
