"use client"

import { ArrowLeft, Home, Mail, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header Section with Illustration */}
        <div className="space-y-6">
          <div className="relative">
            {/* Large 404 Number */}
            <div className="text-9xl md:text-[12rem] font-bold text-muted-foreground/20 select-none">404</div>
            {/* Search Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card rounded-full p-6 shadow-lg">
                <Search className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance leading-14">
              Oops! We couldn't find that page
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-md mx-auto">
              It looks like the link you followed may be broken or the page has been moved.
            </p>
          </div>
        </div>

        {/* Helpful Suggestions Card */}
        <Card className="bg-card border-border">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Here's what you can do:</h2>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Link to="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>

              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Search Bar */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Or search for what you're looking for:</p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input placeholder="What are you looking for?" className="bg-input border-border" />
                <Button size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Section */}
        <div className="text-sm text-muted-foreground">
          <p>💡 Tip: Check the URL for typos or try navigating from our homepage</p>
        </div>
      </div>
    </div>
  )
}
