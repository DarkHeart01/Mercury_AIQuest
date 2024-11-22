import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  FlagIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon, 
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // shadcn Card
import { Button } from "@/components/ui/button"; // shadcn Button
import "./App.css";
import { ArrowRightCircle } from "lucide-react";
import { useParams } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col items-center">
          {/* Heading */}
          

          {/* Full-Width Card */}
          <Card className=" bg-gray-100 w-[700px] relative mb-6 border border-black">
            <CardContent>
              <CardHeader>
                <CardTitle>Post Title</CardTitle>
                <CardDescription>
                "How do you utilize HR software like Rippling to enhance employee onboarding processes?"
                </CardDescription>
              </CardHeader>
              {/* Centrally Aligned Buttons */}
              <div className="flex justify-center space-x-8 mt-6">
                <Button variant="link" className="flex items-center text-gray-700">
                  <FlagIcon className="h-5 w-5 mr-2" />
                  Report
                </Button>
                <Button variant="link" className="flex items-center text-gray-700">
                  <HandThumbUpIcon className="h-5 w-5 mr-2" />
                  Like
                </Button>
                <Button variant="link" className="flex items-center text-gray-700">
                  <ShareIcon className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
              {/* User Input*/}
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Your response:"
                  rows={4}
                  ></textarea>
                  <Button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Response
                  </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI-Generated Response Card */}
          <Card className="w-[700px] bg-gray-50 mb-6 relative border border-black">
            <CardContent>
              {/* Star Icon positioned in the top-right corner */}
              <StarIcon className="h-6 w-6 text-teal-400 absolute top-2 right-2" />
              <h3 className="text-lg font-semibold mb-2">AI-Generated Response</h3>
              <p className="text-left">"HR professionals can enhance employee onboarding using Rippling's features effectively. The onboarding module allows new hires to complete paperwork electronically, streamlining administrative tasks. Integration with payroll and benefits administration simplifies the selection of benefits and payroll setup. The task management feature assigns specific onboarding tasks to the new hire and their manager, promoting accountability. Additionally, the analytics dashboard provides insights into the onboarding process, helping identify areas for improvement."</p>
            </CardContent>
          </Card>

          {/* User Answers Section */}
          <div className="w-[700px]">
            

            {/* Example Answer */}
            <Card className="bg-gray-50 border-b py-4 mb-4 relative border border-black">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Comments Section</h3>
                <p>"Rippling is a game-changer for onboarding new employees! It allows HR teams to send out all the necessary paperwork electronically, which saves a lot of time and hassle. New hires can also choose their benefits right from the platform, making it easy for them to get everything sorted out before they even start. Plus, assigning tasks to both the new hire and their manager helps keep everyone on track. The analytics dashboard is another great feature—it gives insights into how the onboarding process is going and highlights any areas that might need some tweaking."</p>

                {/* Upvote Button (Top Left Corner) */}
                <Button
                  variant="link"
                  className="flex items-center text-gray-700 absolute top-2 left-0 w-10 h-10"
                >
                  <ArrowUpCircleIcon className="w-12 h-12 scale-150" />
                </Button>

                {/* Downvote Button (Bottom Left Corner) */}
                <Button
                  variant="link"
                  className="flex items-center text-gray-700 absolute bottom-2 left-0 w-10 h-10"
                >
                  <ArrowDownCircleIcon className="w-12 h-12 scale-150" />
                </Button>

                <Button
                  variant="link"
                  className="flex items-center text-gray-700 absolute top-2 right-10 w-12 h-12"
                >
                  <UserCircleIcon className="w-12 h-12 scale-150"/>
                  User
                </Button>

                {/* Reply Section */}
                <div className="mt-4">
                  <textarea
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Write your reply..."
                  ></textarea>
                  <Button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {children}

          {/* Footer Section */}
          <footer className="bg-white text-black py-4 text-center mt-8 w-full">
            <p>&copy; {new Date().getFullYear()} Mercury AI. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}




