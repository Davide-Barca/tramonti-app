# `nav-items.ts`

Source: `src/components/site/layout/nav-items.ts` · config (no component) · Test: e2e (`navigation.spec.ts`)

## Purpose

Single source of the site's link lists. Each item = typed static route + key of the `Navigation` messages, so a wrong route or label key fails at compile time.

## Exports

| Export           | Used by      | Items                                                                                        |
| ---------------- | ------------ | -------------------------------------------------------------------------------------------- |
| `mainNavItems`   | `SiteHeader` | Chi siamo, Escursioni, Viaggi, Contatti                                                      |
| `footerNavItems` | `SiteFooter` | Chi siamo, Escursioni, Escursioni su misura, Viaggi, Apprendimento, Contatti, Lavora con noi |
| `legalNavItems`  | `SiteFooter` | Privacy policy, Cookie policy, Termini e condizioni                                          |
| `NavItem`        | types        | `{ href: StaticPathname; label: NavigationKey }`                                             |
| `NavigationKey`  | types        | keys of `Navigation` in `src/messages/it.json`                                               |

## When to use

- Adding/removing/reordering a menu or footer link: edit the list here, then update the e2e expectations in `navigation.spec.ts`.

## Usage

```ts
{ href: "/lavora-con-noi", label: "workWithUs" }
```

New page? Declare it in `pathnames` (`src/i18n/routing.ts`) and add its label to `Navigation` in `it.json` first.

## Rules and notes

- Only static routes (`StaticPathname`); detail pages are never menu items.
- Lists use `as const satisfies readonly NavItem[]`.

## Related

- [SiteHeader](SiteHeader.md), [SiteFooter](SiteFooter.md), [NavLink](NavLink.md).
