import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils"

const NavigationMenu = NavigationMenuPrimitive.Root

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List ref={ref} className={cn("group flex list-none gap-2 p-4 m-0", className)} {...props} />
))
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Item ref={ref} className={cn("relative", className)} {...props} />
))
NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50",
      className,
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute top-0 left-0 w-[15rem] sm:w-[20rem] p-4 rounded-md bg-popover text-popover-foreground shadow-md outline-none data-[side=bottom]:animate-slide-up data-[side=left]:animate-slide-right data-[side=right]:animate-slide-left data-[side=top]:animate-slide-down",
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { active?: boolean }
>(({ className, active, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
      active ? "bg-accent text-accent-foreground" : "transparent",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </a>
))
NavigationMenuLink.displayName = "NavigationMenuLink"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
}

